import PasswordInput from "@/components/input/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateEmail } from "@/utils/helper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Invalid email");
      return 
    }

    if(!password) {
      setError("Please enter password")
      return
    }

    setError("")
  };

  return (
    <div className="min-h-screen bg-cyan-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2" />

      <div className="container min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 md:px-10 lg:px-20 mx-auto">
        {/* Left Side - Banner */}
        <div className="w-full lg:w-2/4 h-64 md:h-[400px] lg:h-[90vh] flex items-end bg-[url('login.png')] bg-cover bg-center rounded-lg p-6 md:p-10 mb-8 lg:mb-0 z-50">
          <div>
            <h4 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]">
              Capture Your <br /> Journeys
            </h4>
            <p className="text-sm md:text-[15px] text-white leading-6 pr-2 md:pr-7 mt-4">
              Record your travel experiences and memories in your personal
              travel journal.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-2/4 h-auto lg:h-[75vh] bg-white rounded-lg lg:rounded-r-lg relative p-6 md:p-10 lg:p-16 shadow-lg shadow-cyan-200/20">
          <form onSubmit={handleLogin}>
            <h4 className="text-xl md:text-2xl font-semibold mb-6">Login</h4>

            <input
              type="text"
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
              Login
            </button>

            <p className="text-xs text-slate-500 text-center my-4">Or</p>

            <button
              type="button"
              className="btn-primary btn-light w-full"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
