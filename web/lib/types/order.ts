import { OrderDirection, RackRowOrder } from "lib/generated/client";
import { snakeCase } from "snake-case";
import { systemFields } from "./rack-row";

export interface Order {
  id: string;
  desc: boolean;
}

export const toRackRowOrder = (orders: Order[]): RackRowOrder[] => {
  return orders.map((order) => {
    if (systemFields.includes(order.id)) {
      return {
        field: snakeCase(order.id),
        direction: order.desc ? OrderDirection.Desc : OrderDirection.Asc,
      };
    }

    return {
      field: order.id,
      direction: order.desc ? OrderDirection.Desc : OrderDirection.Asc,
    };
  });
};
