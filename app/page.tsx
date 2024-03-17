import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

import fs from 'fs';
import path from 'path';

import { GetServerSideProps } from 'next';

import { quiz } from './quiz/sampleQuiz'
import Hero from './components/Hero';
import Header from './components/Header';
import Kartonomics from './components/Kartonomics';
import KartikNFT from './components/KartikNFT';




const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Start Quiz'
    }
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/quiz?currentQuestion=0&somethingelse=false`,
});

export const metadata: Metadata = {
  title: 'Quiz',
  description: 'LFG',
  openGraph: {
    title: 'Smart Account Frame Templatess',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/main.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div className="bg-[#FFD66D]">
      <Header/>
      <Hero />
      <KartikNFT/>
      <Kartonomics/>
    </div>
  );
}


