import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import Footer from './Footer'

export default function LandingPage() {

  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  function OnChangeHandler(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  async function OnSubmitHandler(e) {
    try {
      e.preventDefault();
      let { data } = await axios.post("/api/login", userData);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("loginTimestamp", (Date.now()));
      alert("LOGIN Successfull");
      navigate("/dashBoard");
    } catch (error) {
      alert(error.response.data.error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-1/2 flex flex-col items-center lg:flex-row">
        <div className="px-4 py-8 lg:py-16 lg:px-12 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none text-blue md:text-5xl lg:text-6xl">Hiptify Tools</h1>
          <p className="mt-2 text-lg font-extrabold text-yellow lg:text-xl">v1.0</p>
        </div>

        <div className="w-1/2 flex justify-center items-center h-screen bg-white">
          <section className="border-yellow border-l-4 bg-white w-full">
            <div className="p-8 md:p-10 lg:p-12">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow mb-6">Login</h1>
              <form className="space-y-4" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue">Your email</label>
                  <input
                    onChange={OnChangeHandler}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    className="bg-white border border-blue sm:text-sm rounded-lg block w-full p-2.5 placeholder-gray text-black"
                    required="true"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue">Password</label>
                  <input
                    onChange={OnChangeHandler}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="bg-white border border-blue sm:text-sm rounded-lg block w-full p-2.5 pr-10 placeholder-gray text-black"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-12 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-blue" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-blue" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <button
                  onClick={OnSubmitHandler}
                  type="submit"
                  className="w-full text-white bg-blue hover:bg-dblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Sign-in
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>




  )
}
