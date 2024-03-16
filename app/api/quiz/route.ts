
import { NEXT_PUBLIC_URL } from '@/app/config';
import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { bundlerActions, createSmartAccountClient } from 'permissionless';
import { privateKeyToSafeSmartAccount } from 'permissionless/accounts';
import { pimlicoBundlerActions } from 'permissionless/actions/pimlico';
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { Address, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

import { quiz } from '../../quiz/sampleQuiz'
import { generateFrameData } from '../../frameGenerator/generateFrameData'

import {getTotalQuestions, getOptionsForQuestion, convertOptionstoHTML} from '../../utils/parseQuiz'

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;


// const privateKey = process.env.PRIVATE_KEY!;
// const apiKey = process.env.PIMLICO_API_KEY!;
// const paymasterUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${apiKey}`
// const bundlerUrl = `https://api.pimlico.io/v1/sepolia/rpc?apikey=${apiKey}`

// const publicClient = createPublicClient({
// 	transport: http("https://rpc.ankr.com/eth_sepolia"),
// })
 
// const paymasterClient = createPimlicoPaymasterClient({
// 	transport: http(paymasterUrl),
// })


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
    const question_options = getOptionsForQuestion(quiz, currentQuestion)
    const options_html = convertOptionstoHTML(question_options, currentQuestion_int)

    console.log(total_questions, question_options)

    
  
    return new NextResponse(
      ///getFrameHtml here
      generateFrameData(currentQuestion_int, options_html, tapped_button)
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
