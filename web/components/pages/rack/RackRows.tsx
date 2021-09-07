import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTable, useSortBy } from "react-table";
import { RackRow, RackField, Field, RackRowFilter } from "lib/generated/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckSquare,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faMap } from "@fortawesome/free-regular-svg-icons";
import {
  Table,
  Thead,
  TBody,
  Tr,
  Th,
  TableRow,
  Td,
  AscIcon,
  DescIcon,
  TableHeader,
} from "components/shared/Table";
import { Pagination } from "components/shared/Pagination";
import { Search } from "components/pages/rack/Search";
import { Collection } from "lib/generated/client";
import Loading from "components/shared/Loading";
import Barcode from "react-barcode";
import QRCode from "qrcode.react";
import { Order } from "lib/types/order";

interface Props {
  projectId: string;
  collectionId: string;
  collection: Collection;
  rackFields: RackField[];
  rackRows: RackRow[];
  currentPage: number;
  pageSize: number;
  pageCount: number;
  loading: boolean;
  handleFetch: (
    page: number,
    orders: Order[],
    filters: RackRowFilter[]
  ) => void;
  handlePage: (pageNumber: number) => void;
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  background-color: var(--rack-background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AddButton = styled.td`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: var(--border-disabled-color);
  border: var(--border-width) dashed var(--border-disabled-color);
  border-radius: 0.125rem;
  padding: 16px;
  cursor: pointer;
  font-size: 0.5rem;
  margin: 0 16px 16px 0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Icon = styled.div`
  font-size: 1.3rem;
  width: 32px;
`;

const SettingsIcon = styled.div`
  width: 24px;
  position: absolute;
  right: 12px;
  cursor: pointer;
`;

const Header = styled.div`
  width: 100vw;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TableIcon = styled.div`
  font-size: 1.3rem;
  width: 32px;
  padding: 8px;
  color: var(--accent-color);
`;

const Title = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--text-color);
  padding: 8px 0 16px 0;
`;

const Text = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  padding: 8px 16px 16px 16px;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const BarcodeContainer = styled.div`
  padding: 8px;
  transform: scale(0.3);
`;

const RackRows: React.VFC<Props> = ({
  projectId,
  collectionId,
  collection,
  rackFields,
  rackRows,
  currentPage,
  pageSize,
  pageCount,
  loading,
  handleFetch,
  handlePage,
}) => {
  const router = useRouter();
  const [filters, setFilters] = useState<RackRowFilter[]>([]);
  const sortableColumns = useMemo(
    () =>
      new Set(
        rackFields
          .filter((f) => f.sortable)
          .map((f) => f.name)
          .concat(["updatedAt", "createdAt"])
      ),
    [rackFields]
  );

  const columns = useMemo(
    () => [
      ...rackFields.map((f: RackField) => ({
        Header: f.displayName,
        accessor: f.name,
      })),
      {
        Header: "createdAt",
        accessor: "createdAt",
      },
      {
        Header: "updatedAt",
        accessor: "updatedAt",
      },
    ],
    [rackFields]
  );

  const data = useMemo(() => {
    if (!rackRows) return [];
    const rackFieldsMap = rackFields.reduce((arr, f) => {
      arr[f.name] = f.fieldType;
      return arr;
    }, {});

    const rackFieldsDefaultValue = rackFields.reduce((arr, f) => {
      arr[f.name] = null;
      return arr;
    }, {});
    return rackRows.map((d: RackRow) => {
      return {
        ...rackFieldsDefaultValue,
        ...Object.entries(d.data).reduce((arr, [k, v]) => {
          switch (rackFieldsMap[k] as Field) {
            case Field.Text:
              arr[k] = typeof v === "string" ? v.slice(0, 10) : v;
              break;
            case Field.Number:
              arr[k] = v;
              break;
            case Field.Checkbox:
              if (typeof v === "boolean" && v) {
                arr[k] = (
                  <TableIcon>
                    <FontAwesomeIcon icon={faCheckSquare} />
                  </TableIcon>
                );
              } else {
                arr[k] = (
                  <TableIcon>
                    <FontAwesomeIcon icon={faSquare} />
                  </TableIcon>
                );
              }
              break;
            case Field.Email:
              arr[k] = v;
              break;
            case Field.Location:
              if (Array.isArray(v)) {
                arr[k] = (
                  <TableIcon>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${v.join(
                        ","
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <FontAwesomeIcon icon={faMap} />
                    </a>
                  </TableIcon>
                );
              } else {
                arr[k] = null;
              }
              break;
            case Field.Markdown:
              arr[k] = typeof v === "string" ? v.slice(0, 10) : v;
              break;
            case Field.Image:
              arr[k] = v ? <Image src={v.toString()} alt="image" /> : <></>;
              break;
            case Field.List:
              arr[k] =
                typeof v === "object"
                  ? (v as string[]).join("\n").slice(0, 10)
                  : v;
              break;
            case Field.Barcode:
              arr[k] = v ? (
                <BarcodeContainer>
                  <Barcode value={v.toString()} displayValue={false} />
                </BarcodeContainer>
              ) : (
                <></>
              );
              break;
            case Field.Qrcode:
              arr[k] = v ? (
                <BarcodeContainer>
                  <QRCode value={v.toString()} />
                </BarcodeContainer>
              ) : (
                <></>
              );
              break;
          }
          return arr;
        }, Object),
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
        id: d.id,
      };
    });
  }, [rackRows, rackFields]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
      manualSorting: true,
      autoResetSortBy: false,
    },
    useSortBy
  );
  useEffect(() => {
    handleFetch(currentPage, sortBy, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, currentPage, pageSize, filters]);

  return (
    <Container>
      <Title>
        <Text>{collection.description}</Text>
        <SettingsIcon
          onClick={(e: React.MouseEvent<HTMLInputElement>) => {
            e.stopPropagation();
            router.push(
              `/project/${projectId}/collection/${collectionId}/settings`
            );
          }}
        >
          <FontAwesomeIcon icon={faCog} />
        </SettingsIcon>
      </Title>
      <Header>
        <Search
          allowFieldNames={new Set(rackFields.map((f) => f.name))}
          handleFilterChanged={(filters) => {
            setFilters(filters);
          }}
        />
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          displayPageCount={pageSize === 3 || pageSize === 5 ? pageSize : 3}
          handlePageClick={handlePage}
        />
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, i) => (
              <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) =>
                  sortableColumns.has(column.id) ? (
                    <Th
                      key={i}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <TableHeader>
                        <div>{column.render("Header")}</div>
                        <div>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? DescIcon()
                              : AscIcon()
                            : DescIcon()}
                        </div>
                      </TableHeader>
                    </Th>
                  ) : (
                    <Th key={i} {...column.getHeaderProps()}>
                      <TableHeader>
                        <div>{column.render("Header")}</div>
                      </TableHeader>
                    </Th>
                  )
                )}
              </Tr>
            ))}
          </Thead>
          <TBody {...getTableBodyProps()}>
            <Tr>
              <AddButton
                columns={columns}
                onClick={() => {
                  router.push(
                    `/project/${projectId}/collection/${collectionId}/data/new`
                  );
                }}
              >
                <Icon>
                  <FontAwesomeIcon icon={faPlus} />
                </Icon>
              </AddButton>
            </Tr>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  key={i}
                  {...row.getRowProps()}
                  onClick={() => {
                    router.push(
                      `/project/${projectId}/collection/${collectionId}/data/${row.original.id}/edit`
                    );
                  }}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <Td key={i} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </Td>
                    );
                  })}
                </TableRow>
              );
            })}
          </TBody>
        </Table>
      )}
    </Container>
  );
};

export default RackRows;
