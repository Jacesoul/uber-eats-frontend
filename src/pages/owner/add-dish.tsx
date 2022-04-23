import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const AddDish = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [createDishMutation, { loading }] = useMutation(CREATE_DISH_MUTATION);
  return <h1>Add Dish</h1>;
};
