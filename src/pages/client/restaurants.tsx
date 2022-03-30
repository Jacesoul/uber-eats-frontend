import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../__generated__/restaurantsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IFormProps {
  searchTerm: string;
}

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const navigate = useNavigate();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    navigate({ pathname: "/search", search: `?term=${searchTerm}` });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Uber-Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className=" bg-gray-800 w-full py-20 flex justify-center items-center"
      >
        <input
          ref={register({ required: true, min: 3 })}
          name="searchTerm"
          type="Search"
          placeholder="Search Restaurants..."
          className="input w-3/4 sm:w-5/12 rounded-md border-0"
        />
      </form>
      {!loading && (
        <div className=" max-w-screen-xl mx-auto mt-8 pb-20">
          <div className=" flex justify-around max-w-md mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div
                key={category.id}
                className=" flex flex-col items-center cursor-pointer group"
              >
                <div
                  className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full "
                  style={{
                    backgroundImage: `url(${category.coverImg})`,
                    backgroundSize: "40px 40px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
                <span className=" text-sm text-center font-medium mt-2">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className=" grid sm:grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
                key={restaurant.id}
              ></Restaurant>
            ))}
          </div>
          <div className=" grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className=" focus:outline-none font-medium text-xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className=" text-sm">
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className=" focus:outline-none font-medium text-xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
