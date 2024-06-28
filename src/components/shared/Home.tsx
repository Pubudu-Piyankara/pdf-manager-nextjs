import React, { useState } from "react";
import Image from "next/image";
import { handleError } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const Home = () => {
  return (
    <section className="flex-col py-4 md:flex-row flexBetween gap-10 bg-gray-100 md:gap-8 lg:py-8 z-0">
      <div>
        <Image
          src="/signup2.jpg"
          alt="logo"
          width={1000}
          height={1000}
          className="w-auto h-screen rounded-r-full object-cover  custom-shape opacity-70 lg:opacity-100 lg:relative lg:h-screen lg:w-auto z-0"
        />
      </div>
      <div className="absolute w-2/3 flexCenter  lg:relative text-black pr-5">
        <div className="h-screen flexCenter flex-col bg-blend-hard-light w-full md:flexItemStart md:absolute md:flexCenter lg:w-full lg:relative lg:flexCenter">
          <h1 className="text-3xl lg:text-6xl font-bold text-center mb-4">
            Seamlessly manage your PDF documents with ease
          </h1>
          <p className="text-center text-lg lg:text-gray-600 mb-6">
            Upload, organize, and view your files in a user-friendly and secure
            environment.
          </p>
          <form
            action="/api/file/upload"
            method="post"
            encType="multipart/form-data"
          >
            <input type="file" name="file" />
            <button type="submit">Upload File</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Home;
