"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { IPdf } from "@/lib/models/fileModel";

const UploadPage = () => {
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string>("" as IPdf["filename"]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected");
      return;
    }
    try {
      const data = new FormData();
      const pdf = { filename };
      data.set("file", file);
      // pdf.filename && data.set("filename", pdf.filename);
      const res = await fetch("/api/file/upload", {
        method: "POST",
        body: data ,
      
      });
      if (res.ok) {
        alert("File uploaded");
      }
      ref.current && (ref.current.value = "");
      console.log(" File uploaded");
    } catch (error) {
      console.error(error, " Error uploading file");
    }
  };
  return (
    <div className="flex-col py-4 md:flex-row flexBetween gap-10 bg-gray-100 md:gap-8 lg:py-8 z-0">
      <div>
        <Image
          src="/signup2.jpg"
          alt="logo"
          width={1000}
          height={1000}
          className="w-auto h-screen rounded-r-full object-cover  custom-shape opacity-70 lg:opacity-100 lg:relative lg:h-screen lg:w-auto z-0"
        />
      </div>

      <div className="absolute w-2/3 flexCenter flex-col lg:relative text-black pr-5">
        <div className="h-screen flexCenter flex-col bg-blend-hard-light w-full md:flexItemStart md:absolute md:flexCenter lg:w-full lg:relative lg:flexCenter">
          <h1 className="text-3xl lg:text-6xl font-bold text-center mb-4">
            Seamlessly manage your PDF documents with ease
          </h1>
          <p className="text-center text-lg lg:text-gray-600 mb-6">
            Upload, organize, and view your files in a user-friendly and secure
            environment.
          </p>
        <form onSubmit={submit}>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0])}
            ref={ref}
          />
          {File ? (
            <input
              type="text"
              name="filename"
              placeholder="Enter filename"
              onChange={(e) => setFilename(e.target.value)}
            />
          ):(null)}
          <button className="btn_blue" type="submit">Upload</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
