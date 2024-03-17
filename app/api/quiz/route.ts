
import { NEXT_PUBLIC_URL } from '@/app/config';
import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { bundlerActions, createSmartAccountClient } from 'permissionless';
import { privateKeyToSafeSmartAccount } from 'permissionless/accounts';
import { pimlicoBundlerActions } from 'permissionless/actions/pimlico';
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { Address, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

import {validateAnswer} from '../../utils/validateAnswer'

import { quiz } from '../../quiz/sampleQuiz'
import { generateFrameData } from '../../frameGenerator/generateFrameData'

import {getQuestion, getTotalQuestions, getOptionsForQuestion, convertOptionstoHTML} from '../../utils/parseQuiz'

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;




let user = {
    custody_address: null,
    username: null,
    display_name: null,
    pfp_url: null,
    
  }

export async function POST(req: NextRequest): Promise<Response> {
    

    const body: { trustedData?: { messageBytes?: string } } = await req.json();
  
    // Check if frame request is valid
    const status = await validateFrameRequest(body.trustedData?.messageBytes);
  
    if (!status?.valid) {
      console.error(status);
      throw new Error('Invalid frame request');
    }

    let currentQuestion = req.nextUrl.searchParams.get('currentQuestion');
   

    if(!currentQuestion) throw new Error("Missing search params")

    let currentQuestion_int = parseInt(currentQuestion)

    const nextQuestion = currentQuestion_int + 1

    console.log(currentQuestion, nextQuestion, "currentQuestion")

    console.log(status.action.tapped_button, "tapped_button")

    const tapped_button = status.action.tapped_button.index
 
    


    


  
    //need to fetch user's
    //1. custody address? verified addresses?
    //2. username
    //3. display_name
    //4. pfp url
  
    user.custody_address = status.action.interactor.custody_address
    user.username = status.action.interactor.username
    user.display_name = status.action.interactor.display_name
    user.pfp_url = status.action.interactor.pfp_url
  
    console.log(user.username)
  
    //follower count? following count?
  
  
  
    // return getResponse(ResponseType.SUCCESS);
  
    const encodedCustodyAddress = user.custody_address !== null ? encodeURIComponent(user.custody_address) : "";
    const encodedUsername = user.username !== null ? encodeURIComponent(user.username) : "";
    const encodedPfpUrl = user.pfp_url !== null ? encodeURIComponent(user.pfp_url) : "";








    const total_questions = getTotalQuestions(quiz)
    const question_options = getOptionsForQuestion(quiz, currentQuestion_int)
    const options_html = convertOptionstoHTML(question_options, currentQuestion_int)
    const question_string = getQuestion(quiz, currentQuestion_int)

    const answer_valid = validateAnswer(quiz, currentQuestion_int, tapped_button)

    console.log(answer_valid, tapped_button, question_string, "validateAnswer")



    // console.log(total_questions, question_options)


    let signer: string | undefined = '';

    // // @ts-ignore
    // const { isValid, message } = await getFrameMessage(body, { neynarApiKey: NEYNAR_API_KEY });

    // console.log(message)

    // <meta name="fc:frame:button:1" content="🌲 ${user.custody_address} 🌲">
    

    if(nextQuestion === total_questions) {
        console.log("hit end of quiz", currentQuestion_int, total_questions)
        return new NextResponse(`
        <html>
        <head>
            <meta property="fc:frame" content="vnext" />
            <meta name="fc:frame:image" content="https://play-lh.googleusercontent.com/6_DvJALXHtNqRLwZyJt96H7hcT5InqyAHx0EChmpRZTZSihGWjkd2MihItY5y2Vjrz3w=w240-h480-rw">
            <body>
            <p>BOAT Text</p>
            </body>
        </head>
        </html>
        `
             
        )
    }

    
  
    return new NextResponse(
      ///getFrameHtml here
      await generateFrameData(nextQuestion, question_string, options_html)
    );
  
  }

export const dynamic = 'force-dynamic';

async function validateFrameRequest(data: string | undefined) {
    if (!NEYNAR_API_KEY) throw new Error('NEYNAR_API_KEY is not set');
    if (!data) throw new Error('No data provided');
  
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        api_key: NEYNAR_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ message_bytes_in_hex: data }),
    };
  
    return await fetch(
      'https://api.neynar.com/v2/farcaster/frame/validate',
      options,
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
