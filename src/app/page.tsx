import Hero from "@/components/shared/Hero";
import Services from "@/components/shared/Services";
import { ToastProvider } from "@/components/ui/toast";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <main>
       <ToastProvider>
        
     <Hero />
     <Services />
       </ToastProvider>
    </main>
  );
}
