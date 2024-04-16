
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Extract() {
  let navigate = useNavigate();

  const [artists, setArtists] = useState('');
  const [date, setDate] = useState('today');
  const [report, setReport] = useState('');
  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let token = localStorage.getItem("token");

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

    // Process form submission here, e.g., send data to server
    console.log('Artists:', artists);
    const requestBody = {
      artists
    };

    let { data } = await axios.post(`/api/sos/extract`, requestBody, config);
    // console.log(data.sheet);
    setReport(data.sheet.sheetURL);
    // console.log(report);
    setShowReport(true);
    setLoading(false);
    // Reset form fields;
    setArtists('');
    setDate('today');
  };

  return (
    <div className=" overflow-auto py-9 px-5 " >
      <div className="mb-10 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Extract</span></div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className=" w-1/2 max-w-md mx-auto mt-8 border border-black p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="artists" className="block text-dblue">Artists (Enter comma-separated values)</label>
            <input
              type="text"
              id="artists"
              className="p-1 form-input mt-1 block w-full border border-black text-black rounded"
              value={artists}
              placeholder="Leave this empty to scrape data of all artists."
              onChange={(e) => setArtists(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-dblue">Date</label>
            <select
              id="date"
              className="p-1 form-select text-black mt-1 block w-full border border-black rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="yesterday">Yesterday</option>
            </select>
          </div>
          <div className="text-center">
            <button disabled={loading} type="submit" className="bg-blue text-white px-4 py-2 rounded hover:bg-dblue">Submit</button>
          </div>
        </form>
        {loading ? (
          <div className="text-center font-extrabold text-2xl text-gray">
            <p>Fetching...</p>
          </div>
        ) : (
          <div>
            {showReport && (
              <div>
                <div className="mb-2 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Result:</span></div>
                <span className="text-center font-extrabold text-2xl text-green">Your report is ready: Please click the link below:<br /></span>
                <button onClick={() => window.open(report, '_blank')} className='p-2 font-semibold text-linkBlue hover:underline'>{report}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div >
  );
}

//V_1.0 Done.
