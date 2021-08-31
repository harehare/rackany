import React from "react";
import styled from "styled-components";
import { Project, Collection } from "lib/generated/client";
import RackListItem from "components/shared/RackListItem";
import * as Icon from "components/shared/Icon";
import RackItem from "components/shared/RackItem";
import AddRack from "components/shared/AddRack";

interface Props {
  projects: Project[];
  handleClick: (p: Project) => (e: React.MouseEvent<HTMLInputElement>) => void;
  handleItemClick: (
    p: Project,
    c: Collection
  ) => (e: React.MouseEvent<HTMLInputElement>) => void;
}

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
  padding: 16px;
  overflow-y: scroll;
`;

const Empty = styled.div`
  font-size: 0.85rem;
  color: var(--text-color);
`;

const ProjectList: React.VFC<Props> = ({
  projects,
  handleClick,
  handleItemClick,
}) => {
  if (!projects) {
    return <></>;
  }

  return (
    <List>
      <AddRack href="/project/new" />
      {projects.map((p) => (
        <RackListItem key={p.id} name={p.displayName} onClick={handleClick(p)}>
          {p.collections.length === 0 ? (
            <Empty>The collection has not been created yet</Empty>
          ) : (
            p.collections?.map((c) => (
              <RackItem
                key={c.id}
                name={c.name}
                icon={Icon.Database}
                onClick={handleItemClick(p, c)}
              />
            ))
          )}
        </RackListItem>
      ))}
    </List>
  );
};

export default ProjectList;
