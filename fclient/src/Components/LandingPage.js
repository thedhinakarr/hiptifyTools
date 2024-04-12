import React from 'react'

export default function LandingPage() {
  return (

    <div className="py-8 px-4 bg-white mx-auto justify-items-center h-screen w-screen text-center lg:py-16 lg:px-12">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue md:text-5xl lg:text-6xl "> Hiptify Tools </h1>
      <p className="mb-8 text-lg font-extrabold text-yellow lg:text-xl sm:px-16 xl:px-48 "> v1_0</p>
      <div clasName="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <a href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-blue rounded-lg border border-blue hover:bg-blue hover:text-white">
          Login
        </a>
      </div>

    </div>

  )
}
