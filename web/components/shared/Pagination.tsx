import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  currentPage: number;
  pageCount: number;
  displayPageCount: 3 | 5;
  handlePageClick: (pageNumber: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const Page = styled.div`
  font-weight: ${(props) => (props.isCurrentPage ? 600 : 400)};
  padding: 8px;
  cursor: pointer;
`;

const PageNumber = styled.div`
  padding: 8px;
  margin-bottom: 2px;
`;

const IconButton = styled.button.attrs({
  type: "button",
})`
  width: 24px;
  height: 24px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  color: var(--text-color);
`;

export const Pagination: React.VFC<Props> = ({
  currentPage,
  pageCount,
  displayPageCount,
  handlePageClick,
}) => {
  if (pageCount <= displayPageCount) {
    return generatePagination(
      1,
      pageCount,
      pageCount,
      currentPage,
      handlePageClick
    );
  }

  if (pageCount <= currentPage) {
    return generatePagination(
      currentPage - displayPageCount + 1,
      pageCount,
      pageCount,
      currentPage,
      handlePageClick
    );
  }

  const pageNum = Math.floor(displayPageCount / 2);

  if (currentPage - pageNum <= 0) {
    return generatePagination(
      1,
      displayPageCount,
      pageCount,
      currentPage,
      handlePageClick
    );
  }

  if (currentPage + pageNum <= pageCount) {
    return generatePagination(
      currentPage - pageNum,
      currentPage + pageNum,
      pageCount,
      currentPage,
      handlePageClick
    );
  }

  if (currentPage + pageNum >= pageCount) {
    return generatePagination(
      pageCount - displayPageCount + 1,
      displayPageCount,
      pageCount,
      currentPage,
      handlePageClick
    );
  }

  if (currentPage >= pageCount) {
    return generatePagination(
      currentPage - displayPageCount + 1,
      displayPageCount,
      pageCount,
      currentPage,
      handlePageClick
    );
  }

  return <></>;
};

const generatePagination = (
  firstPage: number,
  endPage: number,
  pageCount: number,
  currentPage: number,
  handlePageClick: (pageCount: number) => void
) => {
  return (
    <Container>
      <IconButton
        disabled={currentPage - 1 <= 0}
        onClick={() => {
          handlePageClick(currentPage - 1);
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </IconButton>
      {[...range(firstPage, endPage)].map((i) => (
        <Page key={i} isCurrentPage={currentPage === i}>
          <PageNumber
            onClick={() => {
              handlePageClick(i);
            }}
          >
            {i}
          </PageNumber>
        </Page>
      ))}
      <IconButton
        disabled={pageCount <= currentPage}
        onClick={() => {
          handlePageClick(currentPage + 1);
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </IconButton>
    </Container>
  );
};

function* range(begin: number, end: number, interval: number = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i;
  }
}
