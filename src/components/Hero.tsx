import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex-col py-4 md:flex-row flexBetween gap-10 bg-orange-50 md:gap-8 lg:py-8 z-0">
      <div>
        <Image
          src="/hero.jpg"
          alt="PDF"
          width={1000}
          height={1000}
          className="absolute rounded-r-full object-cover custom-shape opacity-70 lg:opacity-100 sm:w-full  lg:relative lg:h-screen"
        />
      </div>
      <div className="absolute flexCenter text-black lg:relative lg:text-black pr-5">
        <div className="h-screen flex items-start justify-center flex-col w-full md:flexItemStart md:absolute lg:w-full lg:relative lg:flexCenter">
          <h1 className="text-3xl lg:text-6xl font-bold text-center mb-4">
            Seamlessly manage your PDF documents with ease
          </h1>
          <p className="text-center text-lg lg:text-gray-600 mb-6">
            Upload, organize, and view your files in a user-friendly and secure
            environment.
          </p>
          <button className="flexCenter btn_brown text-white px-6 py-3 rounded-lg transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
