import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCheckSquare,
  faList,
  faEnvelope,
  faMapMarked,
  faBarcode,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";

const Label = styled.div`
  width: 48px;
  height: 32px;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextLabelContainer = styled(Label)`
  background-color: #ffd700;
  color: #fefefe;
`;

const NumberLabelContainer = styled(Label)`
  background-color: #dc143c;
  color: #fefefe;
`;

const ImageLabelContainer = styled(Label)`
  background-color: #2e8b57;
  color: #fefefe;
`;

export const CheckLabelContainer = styled(Label)`
  background-color: #ba55d3;
  color: #fefefe;
`;

export const ListLabelContainer = styled(Label)`
  background-color: #c0c0c0;
  color: #fefefe;
`;

export const EmailLabelContainer = styled(Label)`
  background-color: #ff7f50;
  color: #fefefe;
`;

export const MarkdownLabelContainer = styled(Label)`
  background-color: #008080;
  color: #fefefe;
`;

const LocationLabelContainer = styled(Label)`
  background-color: #339af0;
  color: #fefefe;
`;

const BarcodeLabelContainer = styled(Label)`
  background-color: #666666;
  color: #fefefe;
`;

const QrcodeLabelContainer = styled(Label)`
  background-color: #111;
  color: #fefefe;
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
`;

const Icon2 = styled(Icon)`
  margin-right: 8px;
`;

export const TextLabel: React.VFC<{}> = () => (
  <TextLabelContainer>
    <Icon>{"Ab"}</Icon>
  </TextLabelContainer>
);

export const NumberLabel = () => (
  <NumberLabelContainer>
    <Icon2>{"123"}</Icon2>
  </NumberLabelContainer>
);

export const ImageLabel = () => (
  <ImageLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faImage} />
    </Icon>
  </ImageLabelContainer>
);

export const CheckLabel = () => (
  <CheckLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faCheckSquare} />
    </Icon>
  </CheckLabelContainer>
);

export const EmailLabel = () => (
  <EmailLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faEnvelope} />
    </Icon>
  </EmailLabelContainer>
);

export const ListLabel = () => (
  <ListLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faList} />
    </Icon>
  </ListLabelContainer>
);

export const MarkdownLabel = () => (
  <MarkdownLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faMarkdown} />
    </Icon>
  </MarkdownLabelContainer>
);

export const LocationLabel = () => (
  <LocationLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faMapMarked} />
    </Icon>
  </LocationLabelContainer>
);

export const BarcodeLabel = () => (
  <BarcodeLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faBarcode} />
    </Icon>
  </BarcodeLabelContainer>
);

export const QrCodeLabel = () => (
  <QrcodeLabelContainer>
    <Icon>
      <FontAwesomeIcon icon={faQrcode} />
    </Icon>
  </QrcodeLabelContainer>
);
