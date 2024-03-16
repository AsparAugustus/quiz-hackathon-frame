import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '../config';

import {generateSVG} from '../utils/generateSVG'

export const generateFrameData = async (quizNum : number, options_html : any, tapped_button: any ) => {

  console.log(quizNum, "quizNum")


    return getFrameHtmlResponse({
        // buttons: [
        //   {
        //     label: `generateFrameData!`,
        //   }
        // ]
        buttons : options_html
        ,
        // image:  `${NEXT_PUBLIC_URL}/park-1.png`,
        image:  await generateSVG("example").toString(),
        post_url: `${NEXT_PUBLIC_URL}/api/quiz?currentQuestion=${quizNum}`,
      })
}


