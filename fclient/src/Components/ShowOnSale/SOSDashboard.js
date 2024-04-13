import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../Header";
import Footer from "../Footer";
import Extract from "./Extract/Extract";
import Retrieve from "./Retrieve/Retrieve";
import { useNavigate, useParams } from 'react-router-dom';


export default function SOSDashboard() {
  let navigate = useNavigate();

  const [showExtract, setShowExtract] = useState(true);
  const [showRetrieve, setShowRetrieve] = useState(false);
  const [udata, setuData] = useState({});
  const [lts, setLts] = useState("");

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


  const handleShowExtract = () => {
    setShowExtract(true);
    setShowRetrieve(false);
  };

  const handleShowRetireve = () => {
    setShowExtract(false);
    setShowRetrieve(true);
  };
  function dashBoardHandle(e) {
    e.preventDefault();
    navigate("/dashBoard");
  }
  function logoutHandle(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <Header />
      <div className="flex bg-white flex-row h-screen text-white ">

        <div className="flex flex-nowrap  flex-col w-2/5 h-screen  border-blue border py-3 px-3  ">

          <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-blue text-6xl">ShowsOnSale Tool</span></div>
          <div className="mb-2 font-semibold rounded-lg text-3xl text-blue items-center p-3 ">Hello <span className="text-yellow">{udata.name}</span></div>
          <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3  items-center">Email: <span className="text-yellow">{udata.email}</span></div>
          <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3 mb-10 items-center">Login Timestamp:<br /> <span className="text-yellow">{lts}</span></div>

          <button onClick={handleShowExtract} className="font-semibold hover:bg-yellow hover:text-white mb-2 p-2 text-xl text-yellow rounded-lg items-center ">Extract Data</button>
          <button onClick={handleShowRetireve} className="font-semibold hover:bg-yellow hover:text-white mb-2 p-2 text-xl text-yellow rounded-lg items-center ">Retrieve previous Data</button>
          <button onClick={dashBoardHandle} className="font-semibold hover:bg-yellow hover:text-white mb-2 p-2 text-xl text-yellow rounded-lg items-center">Go back to Tools Dashboard</button>
          <button onClick={logoutHandle} className="font-semibold hover:bg-red hover:text-white mb-2 p-2 text-xl text-red rounded-lg items-center ">Logout<p></p></button>

        </div>

        <div className=" border-blue border overflow-auto w-3/5 py-9 px-5 ">
          {showExtract && <Extract />}
          {showRetrieve && <Retrieve />}
        </div>
      </div>
      <Footer />
    </div>
  )
}
