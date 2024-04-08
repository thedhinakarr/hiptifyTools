import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Extract from "./Extract/Extract";
import Retrieve from "./Retrieve/Retrieve";



export default function SOSDashboard() {

  return (
    <div>
      <Header />
      <div className="flex bg-white flex-row h-screen text-white ">

        <div className="flex flex-nowrap  flex-col w-2/5 h-screen  border-blue border py-3 px-3  ">

          <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-blue text-6xl">ShowsOnSale Tool</span></div>
          <div className="mb-2 font-semibold rounded-lg text-3xl text-blue items-center p-3 ">Hello <span className="text-yellow">Dhinakarr</span></div>
          <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3  items-center">Email: <span className="text-yellow">codedhinakarr@gmail.com</span></div>
          <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3 mb-10 items-center">Login Timestamp: <span className="text-yellow">02/04/2024 5:31PM</span></div>

          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 p-2 text-xl text-yellow rounded-lg items-center ">Extract<p></p></button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 p-2 text-xl text-yellow rounded-lg items-center ">Retrieve previous DATA<p></p></button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 p-2 text-xl text-yellow rounded-lg items-center">Go back to Tools Dashboard<p></p></button>
          <button className="font-semibold hover:bg-red hover:text-white mb-2 p-2 text-xl text-red rounded-lg items-center ">Logout<p></p></button>

        </div>

        <div className=" border-blue border overflow-auto w-3/5 py-9 px-5 ">
          <Extract />
        </div>
      </div>
      <Footer />
    </div>
  )
}
