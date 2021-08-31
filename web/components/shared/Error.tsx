import {
  AuthenticationError,
  BaseError,
  InputError,
  InternalServerError,
  NotFoundError,
  UnknownError,
} from "graphql/error/error";
import React from "react";
import styled from "styled-components";

interface Props {
  errors: BaseError[];
}

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  color: var(--error-color);
`;

const Error: React.VFC<Props> = ({ errors }) => {
  return (
    <Container>
      {errors
        ? errors.map((e) => {
            return (
              <Text key={e.name}>
                {e instanceof AuthenticationError
                  ? "Not Authenticated"
                  : e instanceof InputError
                  ? ""
                  : e instanceof NotFoundError
                  ? ""
                  : e instanceof InternalServerError
                  ? ""
                  : e instanceof UnknownError
                  ? ""
                  : ""}
              </Text>
            );
          })
        : "Unknown Error"}
    </Container>
  );
};

export default Error;
