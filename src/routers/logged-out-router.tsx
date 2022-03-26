import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch("email"));
  };
  const onInvalid = () => {
    console.log("can't create account");
  };
  console.log(errors.email?.type);
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: "This is required",
              validate: (email) => email.includes("@gmail.com"),
              // pattern: /^[A-Za-z0-9._%+-]+gmail.com$/,
            })}
            name="email"
            type="email"
            placeholder="email"
          ></input>
          {errors.email?.message && (
            <span className=" font-bold text-red-600">
              {errors.email.message}
            </span>
          )}
          {errors.email?.type === "validate" && (
            <span className=" font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input
            ref={register({
              required: true,
            })}
            name="password"
            type="password"
            required
            placeholder="password"
          ></input>
        </div>
        <button className=" bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
