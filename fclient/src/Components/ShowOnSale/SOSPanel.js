import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../Header";
import Footer from "../Footer";
import Extract from "./Extract/Extract";
import Retrieve from "./Retrieve/Retrieve";
import { useNavigate, useParams } from 'react-router-dom';


export default function SOSPanel() {
  let navigate = useNavigate();

  const [showExtract, setShowExtract] = useState(true);
  const [showRetrieve, setShowRetrieve] = useState(false);

  useEffect(() => {
    let getData = async () => {
      try {

        let token = localStorage.getItem("token");

        if (token) {
          token = JSON.parse(token);
        }

        else {
          navigate("/")
        }

      } catch (error) {
        alert(error)
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

  return (
    <div className="h-auto py-0 px-0">

      <div className='h-auto text-yellow p-3 font-extrabold border-b-4 border-blue text-center text-4xl'>ShowsOnSale Scraper</div>

      <div className='flex h-auto py-0 px-0'>

        <div className='h-auto flex flex-col text-black w-1/5'>
          <span className="text-4xl text-blue mt-6 ml-4 font-bold">Options: </span>
          <button onClick={handleShowExtract} className="font-semibold hover:bg-yellow hover:text-white m-2 p-2 text-xl text-yellow rounded-lg text-left ">1. Extract Data</button>
          <button onClick={handleShowRetireve} className="font-semibold hover:bg-yellow hover:text-white m-2 p-2 text-xl text-yellow rounded-lg text-left ">2. Retrieve previous Data</button>
        </div>

        <div className='h-full w-4/5 '>
          {showExtract && <Extract />}
          {showRetrieve && <Retrieve />}
        </div>

      </div>
    </div>

  )
}
