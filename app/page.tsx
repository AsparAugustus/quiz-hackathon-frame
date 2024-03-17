import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';




const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Start Quiz'
    }
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  post_url: `${NEXT_PUBLIC_URL}/api/quiz?currentQuestion=0`,
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
    <>
      <h1>Quiz</h1>
    </>
  );
}


