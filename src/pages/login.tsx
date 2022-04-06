import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import uberLogo from "../images/uber-eats-logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LOGIN_MUTAION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit, formState } =
    useForm<ILoginForm>({
      mode: "onChange",
    });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTAION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Uber Eats</title>
      </Helmet>
      <div className=" w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uberLogo} className="w-52 mb-5"></img>
        <h4 className=" w-full font-medium text-left text-2xl mb-5">
          Welcome back
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid gap-3 mt-5 w-full mb-3"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          ></input>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message}></FormError>
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"}></FormError>
          )}
          <input
            ref={register({ required: "Password is required", minLength: 10 })}
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input"
          ></input>
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message}></FormError>
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars."></FormError>
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Log In"}
          ></Button>
          {loginMutationResult?.login.error && (
            <FormError
              errorMessage={loginMutationResult.login.error}
            ></FormError>
          )}
        </form>
        <div>
          New to Uber?{" "}
          <Link
            to="/create-account"
            className=" text-emerald-600 hover:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
