import React from 'react'

export default function Dashboard() {

  return (
    <div className="flex bg-white flex-row h-screen text-white ">

      <div className="flex flex-nowrap  flex-col w-2/5 h-screen  border-blue border py-3 px-3  ">

        <div className="mb-2 overscroll-auto font-semibold  text-lg items-center p-3 "> <span className="text-blue text-6xl"> Dashboard</span></div>
        <div className="mb-2 font-semibold rounded-lg text-3xl text-blue items-center p-3 ">Hello <span className="text-yellow">Dhinakarr</span></div>
        <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3  items-center">Email: <span className="text-yellow">codedhinakarr@gmail.com</span></div>
        <div className="w-64 object-fill font-semibold text-lg text-blue rounded-lg p-3 mb-10 items-center">Login Timestamp: <span className="text-yellow">02/04/2024 5:31PM</span></div>

        <button className="font-semibold hover:bg-red hover:text-white mb-2 p-2 text-xl text-red rounded-lg items-center ">Logout<p></p></button>

      </div>

      <div className="flex border-blue border  flex-nowrap overflow-auto flex-col w-3/5 py-9 px-5 ">
        <div className="mb-10 font-semibold  rounded-lg text-lg items-center p-3 "> <span className="text-blue text-6xl">Tools:</span></div>
        <div className="flex flex-col">
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">ShowsOnSale Scraper</button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Data IQ</button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 3</button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 4</button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 5</button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 6</button>
          <button className="font-semibold hover:bg-yellow hover:text-white mb-2 text-xl text-yellow p-3 rounded-lg items-center text-left">Tool 7</button>
        </div>
      </div>
    </div>
  )
}
