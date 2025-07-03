import PasswordInput from "@/components/input/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/utils/axiosInstance";
import { validateEmail } from "@/utils/helper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

      <div className="container min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-10 lg:px-20 mx-auto">
        {/* Left Side - Banner */}
        <div className="w-full lg:w-2/4 h-64 md:h-[400px] lg:h-[90vh] flex items-end bg-[url('register.png')] bg-cover bg-center rounded-lg p-6 md:p-10 mb-8 lg:mb-0 z-50">
          <div>
            <h4 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]">
              Join the <br /> Adventure
            </h4>
            <p className="text-sm md:text-[15px] text-white leading-6 pr-2 md:pr-7 mt-4">
              Create an account to start documenting your travels and preserving
              your memories in your personal travel journal
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-2/4 h-auto lg:h-[75vh] bg-white rounded-lg lg:rounded-r-lg relative p-6 md:p-10 lg:p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleRegister}>
            <h4 className="text-xl md:text-2xl font-semibold mb-6">Register</h4>

            <input
              type="text"
              placeholder="John Doe"
              className="input-box w-full"
              value={name}
              onChange={({target}) => {setName(target.value)}}
            />

            <input
              type="email"
              placeholder="john123@gmail.com"
              className="input-box w-full"
              value={email}
              onChange={({target}) => {setEmail(target.value)}}
            />

            <PasswordInput 
              value={password}
              onChange={({target}) => {setPassword(target.value)}}
            />

            {
              error && <p className="text-red-500 text-xs pb-1">{error}</p>
            }

            <button type="submit" className="btn-primary w-full">
              Register
            </button>

            <p className="text-xs text-slate-500 text-center my-4">Already have an account ?</p>

            <button
              type="button"
              className="btn-primary btn-light w-full"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
