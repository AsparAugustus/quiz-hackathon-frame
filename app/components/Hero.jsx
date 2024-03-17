import React from 'react';
import './Hero.css';
import kartik from '../assets/kartik-coin.svg';
import Image from 'next/image';

const Hero = () => {
  

  return (
    <>
     <div className='hero-section w-screen mt-24'>

     <div className='icon-box pl-24'>
        <Image
          className='hero-icon w-[500px]'
          src={kartik} // The imported image or a URL
          alt=""
        />
      </div>
    

      <div className='hero-text-large text-left w-1/2 mr-24'>
        Onboarding the next Generation of Consumers to web3 with the power of $KARTIK
      </div>


    </div>

    <div className='hero-text-small text-center'>
      The Kartik Network, is powered by $KARTIK Token and onboards the next generation of consumers in web3, <br/> through empowering those who build for them
    </div>
    <div></div>
    </>
  );
};

export default Hero;