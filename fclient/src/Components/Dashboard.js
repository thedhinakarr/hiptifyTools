import React from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import SOSPanel from "../Components/ShowOnSale/SOSPanel.js"
import DataIQPanel from './DataIQ/DataIQPanel';
import COSPanel from './CodesOnSaleAlert/COSPanel';


export default function Dashboard() {
  const [udata, setuData] = useState({});
  const [lts, setLts] = useState("");
  const [showSOSPanel, setShowSOSPanel] = useState(false);
  const [showDataIQ, setShowDataIQ] = useState(false);
  const [showCOSA, setShowCOSA] = useState(false);
  let navigate = useNavigate();

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
    setShowSOSPanel(true);
    setShowDataIQ(false);
    setShowCOSA(false);
  }

  function dataiqHandle(e) {
    e.preventDefault();
    setShowDataIQ(true);
    setShowSOSPanel(false);
    setShowCOSA(false);
  }

  function cosaHandle(e) {
    e.preventDefault();
    setShowCOSA(true);
    setShowSOSPanel(false);
    setShowDataIQ(false);
  }

  return (
    <div>
      <Header />
      <div className="flex bg-white flex-row min-h-screen text-white">
        <div className="flex flex-col w-1/5 border-blue border-4 py-3 px-3">
          <div className="mb-2 overscroll-auto font-semibold text-lg items-center p-3">
            <span className="font-extrabold text-blue text-4xl">Watermelon Tools</span>
          </div>
          <div className="mb-2 font-semibold rounded-lg text-lg text-blue items-center p-3">
            Hello <span className="text-yellow">{udata.name}</span>
          </div>
          <button onClick={sosHandle} className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">
            ShowsOnSale
          </button>
          <button onClick={dataiqHandle} className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">
            Data IQ
          </button>
          <button onClick={cosaHandle} className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">CodesOnSale Alert</button>

          <div className="mt-auto">
            <button onClick={logoutHandle} className="font-semibold hover:bg-red hover:text-white mb-2 p-2 text-xl text-red rounded-lg items-center ">
              Logout
            </button>
          </div>
        </div>
        <div className="border-blue border-t-4 border-b-4 border-r-4 w-4/5 py-0 px-0">
          {showSOSPanel && <SOSPanel />}
          {showDataIQ && <DataIQPanel />}
          {showCOSA && <COSPanel />}
        </div>
      </div>
      <Footer />
    </div >
  )
}
