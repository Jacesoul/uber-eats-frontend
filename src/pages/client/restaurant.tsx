import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

type IRestaurantParams = {
  id: string;
};

export const Restaurant = () => {
  const params = useParams<IRestaurantParams>();
  const { data, loading } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: Number(params.id),
        },
      },
    }
  );
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const addItemToOrder = (dishId: number) => {
    setOrderItems((current) => [{ dishId }]);
  };
  console.log(orderItems);
  return (
    <div>
      <Helmet>
        <title>
          {data?.restaurant.restaurant?.name || "Loading..."} | Uber Eats
        </title>
      </Helmet>
      <div
        className=" bg-gray-800 py-36 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className=" bg-white sm:w-6/12 xl:w-4/12 py-8 pl-32">
          <h4 className=" text-3xl mb-3">
            {data?.restaurant.restaurant?.name}
          </h4>
          <h5 className=" text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className=" text-xs font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
      <div className="container pb-32 mt-20 flex flex-col items-end">
        <button onClick={triggerStartOrder} className="btn px-10">
          Start Order
        </button>
        <div className="grid sm:grid-cols-3 gap-x-5 gap-y-10 mt-10 w-full">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              id={dish.id}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
            ></Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
