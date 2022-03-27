import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className=" bg-white w-full max-w-lg pt-8 pb-7 rounded-lg text-center">
        <h3 className=" font-bold text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid gap-3 mt-5 px-5"
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
            <span className=" text-red-400 font-medium">
              {errors.email?.message}
            </span>
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
            <span className=" text-red-400 font-medium">
              errors.password?.message
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className=" text-red-400 font-medium">
              Password must be more than 10 chars.
            </span>
          )}
          <button className="btn mt-3">Login</button>
        </form>
      </div>
    </div>
  );
};
