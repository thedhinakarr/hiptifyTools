import React from 'react'
import { useState } from 'react'
import Header from './Header'
import axios from 'axios'
import { useNavigate, link } from 'react-router-dom'
import Footer from './Footer'


export default function Login() {

  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  function OnChangeHandler(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    console.log(userData)
  }

  async function OnSubmitHandler(e) {
    try {
      e.preventDefault();
      let { data } = await axios.post("/api/login", userData);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("loginTimestamp", (Date.now()));
      console.log(localStorage.getItem("loginTimestamp"));
      console.log(localStorage.getItem("token"))
      alert("LOGIN Successfull");
      navigate("/dashBoard");
    } catch (error) {
      alert(error.response.data.error);
      console.log(error)
    }
  }

  return (
    <div>
      <Header />

      <section className="bg-white">
        <div className=" border-t border-blue flex flex-col items-center pt-10 justify-top mb-9  mx-auto md:h-screen lg:py-0">

          <br />

          <div className=" m-10 w-full bg-white rounded-lg shadow border-4 md:mt-0 sm:max-w-md xl:p-0 border-yellow">

            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-blue md:text-2xl">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-blue"
                  >
                    Your email
                  </label>

                  <input
                    onChange={OnChangeHandler}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    className="bg-white border sm:text-sm rounded-lg  block w-full p-2.5 border-blue placeholder-gray text-black"
                    required=""
                  />

                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-blue"
                  >
                    Password
                  </label>
                  <input
                    onChange={OnChangeHandler}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-white border border-blue sm:text-sm rounded-lg  block w-full p-2.5 border-susZGreen placeholder-gray-400 text-black"
                    required=""
                  />
                </div>

                <button
                  onClick={OnSubmitHandler}
                  type="submit"
                  className="w-full text-white bg-blue hover:bg-dblue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign-in

                </button>

              </form>
            </div>
          </div>
        </div>
      </section >

      <Footer />
    </div >
  )
}
