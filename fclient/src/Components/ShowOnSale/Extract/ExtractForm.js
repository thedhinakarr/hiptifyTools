import React, { useState } from 'react';

const ExtractForm = () => {
  const [artists, setArtists] = useState('');
  const [date, setDate] = useState('today');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form submission here, e.g., send data to server
    console.log('Submitted:', { artists, date });
    // Reset form fields
    setArtists('');
    setDate('today');
  };

  return (
    <form onSubmit={handleSubmit} className=" w-1/2 max-w-md mx-auto mt-8 border border-black p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="artists" className="block text-dblue">Artists (Enter comma-separated values)</label>
        <input
          type="text"
          id="artists"
          className="p-1 form-input mt-1 block w-full border border-black text-black rounded"
          value={artists}
          onChange={(e) => setArtists(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-dblue">Date</label>
        <select
          id="date"
          className="p-1 form-select text-black mt-1 block w-full border border-black rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </div>
      <div className="text-center">
        <button type="submit" className="bg-blue text-white px-4 py-2 rounded hover:bg-dblue">Submit</button>
      </div>
    </form>
  );
};

export default ExtractForm;
