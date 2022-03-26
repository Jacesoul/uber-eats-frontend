import React from "react";
import { useForm } from "react-hook-form";

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    console.log(watch("email"));
  };
  const onInvalid = () => {
    console.log("can't create account");
  };
  console.log(errors);
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
