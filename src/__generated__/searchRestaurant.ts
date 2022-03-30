/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SerachRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurant
// ====================================================

export interface searchRestaurant_serachRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurant_serachRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: searchRestaurant_serachRestaurant_restaurants_category | null;
  address: string | null;
  isPromoted: boolean;
}

export interface searchRestaurant_serachRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurant_serachRestaurant_restaurants[] | null;
}

export interface searchRestaurant {
  serachRestaurant: searchRestaurant_serachRestaurant;
}

export interface searchRestaurantVariables {
  input: SerachRestaurantInput;
}
