import { FilterOperator } from "lib/generated/client";

export type FilterOperatorPattern = "" | "<=" | ">=" | ">" | "<" | "!=";

export const toFilterOperator = (op: FilterOperatorPattern) => {
  switch (op) {
    case "<=":
      return FilterOperator.Lte;
    case ">=":
      return FilterOperator.Gte;
    case ">":
      return FilterOperator.Lt;
    case "<":
      return FilterOperator.Gt;
    case "!=":
      return FilterOperator.Ne;
    default:
      return FilterOperator.Eq;
  }
};

export const toOpString = (op: string) => {
  switch (op) {
    case "LTE":
      return "<=";
    case "GTE":
      return ">=";
    case "LT":
      return ">";
    case "GT":
      return "<";
    case "NE":
      return "!=";
    default:
      return "";
  }
};

export const toString = (op: FilterOperator) => {
  switch (op) {
    case FilterOperator.Lte:
      return "<=";
    case FilterOperator.Gte:
      return ">=";
    case FilterOperator.Lt:
      return ">";
    case FilterOperator.Gt:
      return "<";
    case FilterOperator.Ne:
      return "!=";
    default:
      return "";
  }
};
