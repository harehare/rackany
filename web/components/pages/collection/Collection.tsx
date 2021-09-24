import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { RackField, Field, Collection } from "lib/generated/client";
import Rack from "components/shared/Rack";
import RackItem from "components/shared/RackItem";
import AddRackItem from "components/shared/AddRackItem";
import { Button } from "components/shared/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Container } from "components/shared/Container";
import {
  LocationLabel,
  TextLabel,
  ImageLabel,
  EmailLabel,
  ListLabel,
  NumberLabel,
  MarkdownLabel,
  CheckLabel,
  BarcodeLabel,
  QrCodeLabel,
} from "components/shared/FieldLabel";
import { useTranslation } from "react-i18next";

interface Props {
  projectId: string;
  baseCollection: Collection;
  handleSaveChanges: (rackFields: RackField[]) => void;
}

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 100;
`;

const RackActionButton = styled.div`
  width: 40px;
  height: 40px;
  padding: 8px;
  margin-top: 8px;
  color: var(--text-color);
  cursor: pointer;
`;

const ActionButton = styled(Button)`
  margin: 8px;
`;

const fieldIcon = (type: Field) => {
  switch (type) {
    case Field.Text:
      return <TextLabel />;
    case Field.Image:
      return <ImageLabel />;
    case Field.Markdown:
      return <MarkdownLabel />;
    case Field.Email:
      return <EmailLabel />;
    case Field.Location:
      return <LocationLabel />;
    case Field.Checkbox:
      return <CheckLabel />;
    case Field.List:
      return <ListLabel />;
    case Field.Number:
      return <NumberLabel />;
    case Field.Barcode:
      return <BarcodeLabel />;
    case Field.Qrcode:
      return <QrCodeLabel />;
  }
};

const CollectionItem: React.VFC<Props> = ({
  projectId,
  baseCollection,
  handleSaveChanges,
}) => {
  const [state, setState] = useState<{
    collection: Collection | null;
    isLoaded: boolean;
    isChanged: boolean;
  }>({
    collection: baseCollection,
    isLoaded: false,
    isChanged: false,
  });
  const router = useRouter();
  const { t } = useTranslation();

  const handleDrop = async (srcIndex: number, destIndex: number) => {
    const rackFields = { ...state.collection }.rackFields.slice();
    const [dragItem] = rackFields.splice(srcIndex, 1);
    rackFields.splice(destIndex, 0, dragItem);

    const input = rackFields.map((f, i) => ({
      id: f.id,
      collectionId: baseCollection.id,
      name: f.name,
      displayName: f.displayName,
      description: f.description,
      fieldType: f.fieldType,
      order: i + 1,
      sortable: f.sortable,
      stored: f.stored,
      requiredField: f.requiredField,
      createdAt: null,
      updatedAt: null,
    }));

    setState({
      ...state,
      isChanged: true,
      collection: {
        ...state.collection,
        rackFields: input,
      },
    });
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.source || !result.destination) return;
    if (result.source.index === result.destination.index) return;
    handleDrop(result.source.index, result.destination.index);
  };

  const handleDelete = (f: RackField) => {
    setState({
      ...state,
      isChanged: true,
      collection: {
        ...state.collection,
        rackFields: state.collection.rackFields.filter((v) => v.id !== f.id),
      },
    });
  };

  if (!state.collection?.rackFields) {
    return <></>;
  }

  return (
    <Container>
      <Rack
        name={state.collection?.description}
        description={""}
        onSettingsClick={() => {
          router.push(
            `/project/${projectId}/collection/${state.collection.id}/settings`
          );
        }}
      >
        <AddRackItem
          href={`/project/${projectId}/collection/${state.collection?.id}/field/new`}
        />
        <RackItem name={"id"} labels={["System"]} disabled={true} />
        <RackItem name={"createdAt"} labels={["System"]} disabled={true} />
        <RackItem name={"updatedAt"} labels={["System"]} disabled={true} />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {[...state.collection?.rackFields]
                  .sort((f1, f2) => f1.order - f2.order)
                  .map((f, i) => (
                    <Draggable key={f.id} draggableId={f.id} index={i}>
                      {(provided, snapshot) => {
                        const style = {
                          cursor: snapshot.isDragging ? "grabbing" : "grab",
                          ...provided.draggableProps.style,
                        };
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={style}
                          >
                            <RackItem
                              key={f.id}
                              name={f.displayName}
                              description={f.name}
                              icon={fieldIcon(f.fieldType)}
                              labels={[
                                f.fieldType.toLowerCase(),
                                f.sortable ? "Sortable" : "",
                              ]}
                              actionButton={
                                <RackActionButton
                                  onClick={(
                                    e: React.MouseEvent<HTMLInputElement>
                                  ) => {
                                    e.stopPropagation();
                                    handleDelete(f);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faWindowClose} />
                                </RackActionButton>
                              }
                              onClick={() => {
                                router.push(
                                  `/project/${projectId}/collection/${state.collection?.id}/field/${f.id}/edit`
                                );
                              }}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Rack>
      <ButtonContainer>
        <ActionButton
          onClick={() => handleSaveChanges(state.collection?.rackFields)}
          disabled={!state.isChanged}
        >
          {t("save_changes")}
        </ActionButton>
      </ButtonContainer>
    </Container>
  );
};

export default CollectionItem;
