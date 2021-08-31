import React from "react";
import { Project, Collection } from "lib/generated/client";
import Rack from "components/shared/Rack";
import RackItem from "components/shared/RackItem";
import AddRackItem from "components/shared/AddRackItem";
import * as Icon from "components/shared/Icon";
import { Container } from "components/shared/Container";

interface Props {
  project: Project;
  handleClick: (
    c: Collection
  ) => (e: React.MouseEvent<HTMLInputElement>) => void;
  handleSettingsClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const ProjectItem: React.VFC<Props> = ({
  project,
  handleClick,
  handleSettingsClick,
}) => {
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
        <AddRackItem href={`/project/${project.id}/collection/new`} />
        {project.collections.map((c) => (
          <RackItem
            key={c.id}
            name={c.name}
            description={c.displayName}
            icon={Icon.Database}
            onClick={handleClick(c)}
          />
        ))}
      </Rack>
    </Container>
  );
};

export default ProjectItem;
