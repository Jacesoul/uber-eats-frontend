import { gql, useQuery } from "@apollo/client";
import React from "react";
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
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <form className=" bg-gray-800 w-full py-24 flex justify-center items-center">
        <input
          type="Search"
          placeholder="Search Restaurants..."
          className="input w-4/12 rounded-md border-0"
        />
      </form>
      {!loading && (
        <div className=" max-w-screen-xl mx-auto mt-8">
          <div className=" flex justify-around max-w-md mx-auto">
            {data?.allCategories.categories?.map((category, index) => (
              <div
                key={index}
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
          <div className=" grid grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div>
                <div
                  className=" py-24 bg-cover bg-center mb-2"
                  style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                ></div>
                <h3 className=" text-sm font-medium">{restaurant.name}</h3>
                <span className=" border-t-2 border-gray-400">
                  {restaurant.category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
