import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Project, Collection } from "lib/generated/client";
import RackListItem from "components/shared/RackListItem";
import * as Icon from "components/shared/Icon";
import RackItem from "components/shared/RackItem";
import AddRack from "components/shared/AddRack";
import Fuse from "fuse.js";
import { Container } from "components/shared/Container";
import { Search } from "components/shared/Search";

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

const searchOptions = {
  includeScore: true,
  keys: [
    {
      name: "name",
      weight: 0.5,
    },
    {
      name: "displayName",
      weight: 0.6,
    },
    {
      name: "description",
      weight: 0.3,
    },
    {
      name: "collections.name",
      weight: 0.3,
    },
  ],
};

const ProjectList: React.VFC<Props> = ({
  projects,
  handleClick,
  handleItemClick,
}) => {
  const [filteredProjects, setProjects] = useState(projects);
  const [query, setQuery] = useState("");
  const searchProjects = useMemo(
    () => new Fuse(projects, searchOptions),
    [projects]
  );

  useEffect(() => {
    if (!query) {
      setProjects(projects);
      return;
    }
    const result = searchProjects.search(query);
    setProjects(result.map((v) => v.item));
  }, [projects, searchProjects, query]);

  if (!projects) {
    return <></>;
  }

  return (
    <Container>
      <Search
        text={query}
        placeholder="Search"
        handleInput={(text: string) => {
          setQuery(text);
        }}
      />
      <List>
        <AddRack href="/project/new" />
        {(filteredProjects ?? projects).map((p) => (
          <RackListItem
            key={p.id}
            name={p.displayName}
            onClick={handleClick(p)}
          >
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
    </Container>
  );
};

export default ProjectList;
