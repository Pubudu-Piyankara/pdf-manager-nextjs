import React, { useState } from "react";
import Image from "next/image";
import { handleError } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onUpload = () => {
    try {
      if (!file) {
        toast({
          title: "No file selected",
          description: "Please select a file to upload.",
          variant: "destructive", // Adjust to the correct prop for your toast
        });
        return;
      }
      if (file.size > 1024 * 1024) {
        toast({
          title: "File too large",
          description: "The file size should be less than 1MB.",
          variant: "destructive",
        });
        return;
      }
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      // Proceed with your upload logic, e.g., send formData to an API endpoint
      // Assuming the upload is successful
      toast({
        title: "File uploaded successfully",
        variant: "default",
      });

    } catch (error: any) {
      handleError(error);
      toast({
        title: "Upload failed",
        description: error.message,
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
          className="w-auto h-screen rounded-r-full object-cover custom-shape opacity-70 lg:opacity-100 lg:relative lg:h-screen lg:w-auto z-0"
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
          <form>
            <input
              type="file"
              accept="application/pdf"
              placeholder="Upload here"
              onChange={(e) => { setFile(e.target.files?.[0] || null) }}
            />
          </form>
          <button
            className="flexCenter btn_brown bg-orange-600 text-white px-6 py-3 rounded-lg transition"
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
