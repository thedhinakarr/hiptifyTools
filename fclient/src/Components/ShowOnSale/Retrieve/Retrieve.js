import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Retrieve() {
  let navigate = useNavigate();
  const [date, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

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

    const requestBody = {
      date
    };

    let data = await axios.post(`/api/sos/retrieve`, requestBody, config);

    // console.log(data.data);
    const urls = data.data.reverse().map(ele => { return [ele.sheetURL, ele.createdAt] });
    setReport(urls);
    // console.log(report);
    setShowReport(true);
    setLoading(false);
  };
  return (
    <div className="overflow-auto py-9 px-5 " >
      <div className="mb-10 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Retrieve</span></div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="w-1/2 max-w-md mx-auto mt-8 border border-black p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="date" className="block text-dblue">Date</label>
            <input
              type="date"
              id="date"
              className="p-1 form-input mt-1 block w-full border text-black border-black rounded"
              value={date}
              onChange={handleDateChange}
              required
              disabled={loading}
            />
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
                <span className="text-center font-extrabold text-2xl text-green">
                  {report.length} Sheets generated on {date}:<br />
                  <span className='text-purple'>&nbsp;Time&nbsp; -&gt;</span>&nbsp;&nbsp;
                  <span className='text-linkBlue'>Link</span>
                </span>
                <ul>
                  {report.map((link, index) => {
                    let formattedTime = 'Invalid Date';
                    {
                      const dateObj = new Date(link[1]);
                      const hours = dateObj.getHours();
                      const minutes = dateObj.getMinutes();
                      const seconds = dateObj.getSeconds();
                      formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    }

                    return (
                      <li key={index}>
                        <span className='p-2 font-semibold text-purple'>{formattedTime} -></span>
                        <button onClick={() => window.open(link[0], '_blank')} className=' text-left p-2 font-semibold text-linkBlue hover:underline'>{link[0]} </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
