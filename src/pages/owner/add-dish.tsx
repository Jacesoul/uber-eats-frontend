import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import {
  createDish,
  createDishVariables,
} from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: Number(restaurantId),
          },
        },
      },
    ],
  });
  const { register, getValues, formState, handleSubmit, setValue } =
    useForm<IForm>({
      mode: "onChange",
    });
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    console.log(rest);
    // createDishMutation({
    //   variables: {
    //     input: {
    //       name,
    //       price: +price,
    //       description,
    //       restaurantId: Number(restaurantId),
    //     },
    //   },
    // });
    // navigate(-1);
  };
  const [optionNumber, setOptionsNumber] = useState(0);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => current + 1);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current - 1);
    // @ts-ignore
    setValue(`${idToDelete}-optionName`, "");
    // @ts-ignore
    setValue(`${idToDelete}-optionExtra`, "");
  };
  return (
    <div className="container flex flex-col justify-center items-center">
      <Helmet>
        <title>Add Dish | Uber Eats</title>
      </Helmet>
      <h1 className=" font-semibold text-2xl mb-3">Add Dish</h1>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
          ref={register({ required: "Price is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          ref={register({ required: "Description is required." })}
        />
        <div className="my-10">
          <h4 className=" font-medium mb-3 text-lg">Dish Options</h4>
          <span
            onClick={onAddOptionClick}
            className=" cursor-pointer text-white bg-gray-900 py-1 px-2 "
          >
            Add Dish Option
          </span>
          {optionNumber !== 0 &&
            Array.from(new Array(optionNumber)).map((_, index) => (
              <div key={index} className=" mt-5">
                <input
                  ref={register}
                  name={`${index}-optionName`}
                  className=" py-2 px-4 focus:outline-none focus:border-gray-600 border-2 mr-3"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  ref={register}
                  name={`${index}-optionExtra`}
                  className=" py-2 px-4 focus:outline-none focus:border-gray-600 border-2 "
                  type="number"
                  min={0}
                  placeholder="Option Extra Price"
                />
                <span onClick={() => onDeleteClick(index)}>Delete Option</span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        ></Button>
      </form>
    </div>
  );
};
