import { gql, useMutation } from "@apollo/client";
import React from "react";
import Helmet from "react-helmet";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import uberLogo from "../images/uber-eats-logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTAION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, getValues, watch, errors, handleSubmit, formState } =
    useForm<ICreateAccountForm>({
      mode: "onChange",
      defaultValues: {
        role: UserRole.Client,
      },
    });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTAION);
  const onSubmit = () => {};
  console.log(watch());
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Uber Eats</title>
      </Helmet>
      <div className=" w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={uberLogo} className="w-52 mb-5"></img>
        <h4 className=" w-full font-medium text-left text-2xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid gap-3 mt-5 w-full mb-3"
        >
          <input
            ref={register({ required: "Email is required" })}
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          ></input>
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message}></FormError>
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
          <select
            name="role"
            ref={register({ required: true })}
            className="input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={false}
            actionText={"Log In"}
          ></Button>
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/login" className=" text-emerald-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
