"use client"
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const LandingPage = () => {
 

  return (
    <div>
      <div className='circles-container'></div>
      <section className='flexBetween max-container padding-container'>
        <div className='mt-32'>
          <Image src="/main.jpg" alt="PDF" width={500} height={500} className='rounded-full' />
        </div>
        <div className='flexCenter flex-col'>
          <h1>PDF Master</h1>
          <p>PDF Master is a web app that manages PDF files.</p>
          <button>Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
