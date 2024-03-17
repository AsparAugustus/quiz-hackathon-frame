
import logo from "../assets/kartik-coin.svg";
import kartik from "../assets/kartik-image.svg";

import Image from 'next/image';

import Link from 'next/link';



function Header() {


  return (
    // change to grid system 
    <>
      <header className="flex justify-around items-center mt-2 sm:mt-[-20px] mb-72 md:mb-0 md:mt-3 lg:mt-6 lg:mx-24 xl:mx-12 py-[25px] rounded-2xl h-24 bg-[#0B0C15]/40">
      <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 sm:gap-2 md:grid-cols-8 md:gap-3 lg:grid-cols-12 lg:gap-4 items-center lg:pr-28 xl:pr-0 lg:mr-12 xl:mr-0">
      <div className="col-start-1 col-span-3">
        <div className="flex flex-row justify-start items-center gap-1">

        <Image
          className='hidden sm:inline-block h-24 fadeInLeft'
          src={kartik} // The imported image or a URL
          alt="Kartik"
        />

        {/* <Image
          className='sm:hidden h-16 fadeInLeft'
          src={kartik} // The imported image or a URL
          alt="Kartik"
        /> */}
        <div className="text-3xl text-white">
            Kartik.Network
        </div>
        </div>
        </div>

        {/* desktop nav */}
        <div className='col-start-8 col-span-4 items-center pb-1'>
        <nav className="hidden lg:flex gap-8 items-center fadeInRight">
          
          <Link href='/About' className="text-white hover:text-[#2E396D] font-bold text-xl flex flex-col items-center">
            $KARTIK
            </Link>
          <Link href='#Tokenmomics'  className="text-white hover:text-[#2E396D] font-bold text-xl flex flex-col items-center">
           Tokenomics
          </Link>
          
          <Link href='#Pump' className="text-white hover:text-[#2E396D] font-bold text-xl flex flex-col items-center">
            KartikVoiceAi
          </Link>
        </nav>
        </div>
        </div>

        
      </header>
    </>
  );
}

export default Header;