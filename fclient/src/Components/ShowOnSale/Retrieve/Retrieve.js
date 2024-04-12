import React, { useState } from 'react';

export default function Retrieve() {
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form submission here, e.g., send data to server
    console.log('Submitted:', { selectedDate });
    // Reset form fields
    setSelectedDate('');
  };
  return (
    <div className=" overflow-auto py-9 px-5 " >
      <div className="mb-10 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Retrieve:</span></div>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="w-1/2 max-w-md mx-auto mt-8 border border-black p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="date" className="block text-dblue">Date</label>
            <input
              type="date"
              id="date"
              className="p-1 form-input mt-1 block w-full border border-black rounded"
              value={selectedDate}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue text-white px-4 py-2 rounded hover:bg-dblue">Submit</button>
          </div>
        </form>
        <div className="mb-2 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Result:</span></div>
        <div>
          <span className="text-green ">Here's the sheet link for the mentioned date: <br /></span>
          <span className="text-green">https://google.sheets.com/falksjdhflajksdhf</span>
        </div>

      </div>
    </div >
  );
}
