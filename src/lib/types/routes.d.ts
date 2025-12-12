import type { ROUTE_ACCESS_CONDITION } from "../constants/route-access";

export type RouteAccessCondition =
  (typeof ROUTE_ACCESS_CONDITION)[keyof typeof ROUTE_ACCESS_CONDITION];
