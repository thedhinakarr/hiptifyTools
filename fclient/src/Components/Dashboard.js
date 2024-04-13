import React from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';


export default function Dashboard() {
  const [udata, setuData] = useState({});
  const [lts, setLts] = useState("");

  let navigate = useNavigate();
  // let token = localStorage.getItem("token");
  // console.log(token);

  useEffect(() => {
    let getData = async () => {
      try {

        let token = localStorage.getItem("token");
        let lts = localStorage.getItem("loginTimestamp");
        setLts(new Date(parseInt(lts, 10)).toString())

        // console.log(token);

        if (token) {
          token = JSON.parse(token);
        }

        else {
          navigate("/")
        }

        const config = {
          headers: {
            "auth-token": token
          }
        };

        let { data } = await axios.get(`/api/getUserByToken`, config);
        setuData(data.user);
      } catch (error) {
        console.error(error.response.data)
      }
    }
    getData();
  }, []);

  function logoutHandle(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  }

  function sosHandle(e) {
    e.preventDefault();
    navigate("/sosDashboard");
  }

  return (
    <div>
      <Header />
      <div className="flex bg-white flex-row h-screen text-white ">

        <div className="flex flex-nowrap  flex-col w-2/5 h-screen  border-blue border py-3 px-3  ">

          <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-blue text-6xl"> Dashboard</span></div>
          <div className="mb-2 font-semibold rounded-lg text-3xl text-blue items-center p-3 ">Hello <span className="text-yellow">{udata.name}</span></div>
          <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3  items-center">Email: <span className="text-yellow">{udata.email}</span></div>
          <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3 mb-10 items-center">Login Timestamp: <br /><span className="text-yellow">{lts}</span></div>

          <button onClick={logoutHandle} className="font-semibold hover:bg-red hover:text-white mb-2 p-2 text-xl text-red rounded-lg items-center ">Logout<p></p></button>

        </div>

        <div className="flex border-blue border  flex-nowrap overflow-auto flex-col w-3/5 py-9 px-5 ">
          <div className="mb-10 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Watermelon Tools:</span></div>
          <div className="flex flex-col">
            <button onClick={sosHandle} className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">ShowsOnSale Scraper</button>
            <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Data IQ</button>
            <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 3</button>
            <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 4</button>
            <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 5</button>
            <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 6</button>
            <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 7</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
