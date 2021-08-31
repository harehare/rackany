import React from "react";
import styled from "styled-components";
import { Project } from "lib/generated/client";
import Rack from "components/shared/Rack";
import RackItem from "components/shared/RackItem";
import AddRackItem from "components/shared/AddRackItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { toString as roleToString } from "lib/types/role";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { Container } from "components/shared/Container";

interface Props {
  project: Project;
  handleRevokeClick: (id: string) => void;
}

const Icon = styled.div`
  font-size: 1.3rem;
  width: 32px;
  padding: 8px;
  &:hover {
    color: var(--accent-color);
  }
`;

const RevokeButton = styled.div`
  padding: 2px 16px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--error-color);
  border: 2px solid var(--error-color);
  margin: 8px;
  border-radius: 0.25rem;
  &:hover {
    color: #fff;
    background-color: var(--error-color);
  }
`;

const ApiKeys: React.VFC<Props> = ({ project, handleRevokeClick }) => {
  return (
    <Container>
      <Rack
        name="API Key List"
        description={project.description}
        onSettingsClick={() => {}}
        onClick={() => {}}
      >
        <AddRackItem href={`/project/${project.id}/apikey/new`} />
        {project.apiKeys.map((a) => (
          <RackItem
            key={a.id}
            icon={
              <CopyToClipboard
                text={a.apiKey}
                onCopy={() => {
                  toast.success("Copied", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                <Icon>
                  <FontAwesomeIcon icon={faCopy} />
                </Icon>
              </CopyToClipboard>
            }
            name={a.name}
            labels={[roleToString(a.role)]}
            actionButton={
              <RevokeButton
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  e.stopPropagation();
                  handleRevokeClick(a.id);
                }}
              >
                Revoke
              </RevokeButton>
            }
          />
        ))}
      </Rack>
    </Container>
  );
};

export default ApiKeys;
