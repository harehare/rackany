import React, { useEffect, useMemo, useState } from "react";
import { Project, Collection } from "lib/generated/client";
import Rack from "components/shared/Rack";
import RackItem from "components/shared/RackItem";
import AddRackItem from "components/shared/AddRackItem";
import * as Icon from "components/shared/Icon";
import { Container } from "components/shared/Container";
import Fuse from "fuse.js";
import { Search } from "components/shared/Search";

interface Props {
  project: Project;
  handleClick: (
    c: Collection
  ) => (e: React.MouseEvent<HTMLInputElement>) => void;
  handleSettingsClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

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
  ],
};

const ProjectItem: React.VFC<Props> = ({
  project,
  handleClick,
  handleSettingsClick,
}) => {
  const [filteredCollections, setCollections] = useState(project.collections);
  const [query, setQuery] = useState("");
  const searchCollections = useMemo(
    () => new Fuse(project.collections, searchOptions),
    [project]
  );

  useEffect(() => {
    if (!query) {
      setCollections(project.collections);
      return;
    }
    const result = searchCollections.search(query);
    setCollections(result.map((v) => v.item));
  }, [project, searchCollections, query]);

  if (!project) {
    return <></>;
  }

  return (
    <Container>
      <Rack
        name={project.displayName}
        description={project.description}
        onSettingsClick={handleSettingsClick}
        onClick={() => {}}
      >
        <Search
          text={query}
          placeholder="Search"
          handleInput={(text: string) => {
            setQuery(text);
          }}
        />
        <AddRackItem href={`/project/${project.id}/collection/new`} />
        {(filteredCollections ? filteredCollections : project.collections).map(
          (c) => (
            <RackItem
              key={c.id}
              name={c.name}
              description={c.displayName}
              icon={Icon.Database}
              onClick={handleClick(c)}
            />
          )
        )}
      </Rack>
    </Container>
  );
};

export default ProjectItem;
