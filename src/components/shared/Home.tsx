import React, { useState } from "react";
import Image from "next/image";
import { handleError } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const Home = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { toast } = useToast();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();


  const onUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    if (!fileName) {
      toast({
        title: "No file name",
        description: "Please enter a file name.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await axios.post("/api/file/post", { name: fileName, file:file });
      const { url, thumbnailUrl } = res.data;

      setUrls({ url, thumbnailUrl });
      toast({
        title: "Success",
        description: "File uploaded successfully.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: handleError(error),
        variant: "destructive",
      });
    }
  };

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
          <form className="flexCenter flex-col">
            <input
              type="file"
              accept="application/pdf"
              placeholder="Upload here"
              onChange={(e) => {
                setFile(e.target.files?.[0]);
              }}
            />
            {file ? (
              <input
                id="filename"
                type="text"
                placeholder="Enter file name"
                onChange={(e) => {
                  setFileName(e.target.value || null);
                }}
                className="px-2 py-1 border rounded-full"
              />
            ) : null}
          </form>
          <button
            className=" btn_blue text-white  rounded-lg transition"
            onClick={onUpload}
          >
            Upload PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
