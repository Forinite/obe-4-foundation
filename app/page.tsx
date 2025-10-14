import Image from "next/image";
import HomePage from "@/app/(components)/HomePage/page";
import Navbar from "@/app/subcomponents/Navbar";
import Footer from "@/app/subcomponents/Footer";

export default function Home() {
  return (
    <div>
        <Navbar />
        <HomePage />
        <Footer />
    </div>
  );
}
