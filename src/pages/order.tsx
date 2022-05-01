import { gql, useQuery, useSubscription } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { FULL_ORDER_FRAGMENT } from "../fragments";
import { getOrder, getOrderVariables } from "../__generated__/getOrder";
import {
  orderUpdates,
  orderUpdatesVariables,
} from "../__generated__/orderUpdates";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

type IParams = {
  id: string;
};

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: {
      input: {
        id: Number(params.id),
      },
    },
  });

  const { data: subscriptonData } = useSubscription<
    orderUpdates,
    orderUpdatesVariables
  >(ORDER_SUBSCRIPTION, {
    variables: {
      input: {
        id: Number(params.id),
      },
    },
  });

  console.log(subscriptonData);
  return (
    <div className="container mt-32 flex justify-center">
      <Helmet>
        <title>Order #{params.id}</title>
      </Helmet>
      <div className="border border-gray-700 w-full max-w-screen-sm flex flex-col">
        <h4 className=" bg-gray-800 w-full py-5 text-white text-center text-xl">
          Order #{params.id}
        </h4>
        <h5 className=" p-5 pt-10 text-3xl text-center">
          ${data?.getOrder.order?.total}
        </h5>
        <div className=" p-5 text-xl grid gap-6">
          <div className=" border-t pt-5 border-gray-700">
            Prepared By:{" "}
            <span className=" font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t pt-5 border-gray-700">
            Deliver To:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            Driver:{" "}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || "Not yet."}{" "}
            </span>
          </div>
          <span className=" text-center mt-5 mb-3 text-2xl text-emerald-600">
            Status: {data?.getOrder.order?.status}
          </span>
        </div>
      </div>
    </div>
  );
};