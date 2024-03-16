import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '../config';

import {generateSVG} from '../utils/generateSVG'

export const generateFrameData = (quizNum : number ) => {


    return getFrameHtmlResponse({
        buttons: [
          {
            label: `Start conversion!`,
          }
        ],
        image:  `${NEXT_PUBLIC_URL}/park-1.png`,
        // image:  await generateSVG("example"),
        post_url: `${NEXT_PUBLIC_URL}/api/quiz`,
      })




}