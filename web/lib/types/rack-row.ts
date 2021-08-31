import { RackField, Field, RackRowItemInput } from "lib/generated/client";

type DataType = string | number | boolean | number[] | string[];

export const systemFields = ["id", "createdAt", "updatedAt"];

export interface RackRow {
  id: string;
  data: { [name: string]: DataType };
  createdAt: Date;
  updatedAt: Date;
}

export const toText = (data: DataType | undefined): string => {
  if (!data) return "";
  return typeof data === "string" ? data : "";
};
export const toMarkdown = (data: DataType | undefined) => toText(data);
export const toImage = (data: DataType | undefined) => toText(data);
export const toEmail = (data: DataType | undefined) => toText(data);
export const toList = (data: DataType | undefined) => {
  if (!data) return "";
  return typeof data === "object" ? data.join("\n") : "";
};
export const toLocation = (data: DataType | undefined): [number, number] => {
  if (!data) return [0.0, 0.0];
  if (typeof data === "string") {
    const latLon = data.split(",");
    if (latLon.length != 2) {
      return [0.0, 0.0];
    }
    const lat = parseFloat(latLon[0]);
    const lon = parseFloat(latLon[1]);

    return [isNaN(lat) ? 0.0 : lat, isNaN(lon) ? 0.0 : lon];
  }

  return [0.0, 0.0];
};
export const toNumber = (data: DataType | undefined): number => {
  if (!data) return 0;
  return typeof data === "number" ? data : 0;
};
export const toCheckBox = (data: DataType | undefined): boolean => {
  if (!data) return false;
  return typeof data === "boolean" ? data : false;
};

export const createData = async (
  field: RackField,
  data: string | boolean,
  defaultValue?: string
): Promise<string> => {
  switch (field.fieldType) {
    case Field.Image:
      return typeof data === "string" ? data : defaultValue;
    case Field.Checkbox:
      if (typeof data === "boolean") {
        return data.toString();
      } else {
        return "false";
      }
    case Field.Email:
    case Field.Markdown:
    case Field.Location:
    case Field.List:
    case Field.Number:
    case Field.Text:
    case Field.Barcode:
    case Field.Qrcode:
      return typeof data === "string" ? data : defaultValue;
  }
};

export const createInput = async (
  rackFields: RackField[],
  data: any
): Promise<RackRowItemInput[]> => {
  const input = rackFields.map(async (f) => {
    const v =
      f.fieldType === "LOCATION"
        ? `${data[`${f.name}Lat`]},${data[`${f.name}Lon`]}`
        : data[f.name];
    return {
      rackFieldId: f.id,
      name: f.name,
      data: await createData(f, v),
    };
  });
  return await Promise.all(input);
};

export const updateInput = async (
  rackFields: RackField[],
  rackRow: RackRow,
  data: any
): Promise<RackRowItemInput[]> => {
  const input = rackFields.map(async (f) => {
    const v =
      f.fieldType === "LOCATION"
        ? `${data[`${f.name}Lat`]},${data[`${f.name}Lon`]}`
        : data[f.name];

    return {
      rackFieldId: f.id,
      name: f.name,
      data: await createData(f, v, rackRow.data[f.name]?.toString()),
    };
  });
  return await Promise.all(input);
};
