
import { NEXT_PUBLIC_URL } from '@/app/config';
import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { bundlerActions, createSmartAccountClient } from 'permissionless';
import { privateKeyToSafeSmartAccount } from 'permissionless/accounts';
import { pimlicoBundlerActions } from 'permissionless/actions/pimlico';
import { createPimlicoPaymasterClient } from 'permissionless/clients/pimlico';
import { Address, createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';


const privateKey = process.env.PRIVATE_KEY!;
const apiKey = process.env.PIMLICO_API_KEY!;
const paymasterUrl = `https://api.pimlico.io/v2/sepolia/rpc?apikey=${apiKey}`
const bundlerUrl = `https://api.pimlico.io/v1/sepolia/rpc?apikey=${apiKey}`

const publicClient = createPublicClient({
	transport: http("https://rpc.ankr.com/eth_sepolia"),
})
 
const paymasterClient = createPimlicoPaymasterClient({
	transport: http(paymasterUrl),
})

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body: FrameRequest = await req.json();
        console.log('Received Frame request:', body);

        const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_API_KEY! });
        console.log('Frame message validation result:', isValid ? 'Valid' : 'Invalid', message);

        if (!isValid || !message) {
            console.error('Invalid Frame message');
            return new NextResponse('Invalid Frame message', { status: 400 });
        }

        const accountAddress = message.interactor.verified_accounts[0] as Address;
        console.log('Account address:', accountAddress);

        // send transaction
        const account = await privateKeyToSafeSmartAccount(publicClient, {
            privateKey: privateKey as Address,
            safeVersion: "1.4.1", // simple version
            entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
            saltNonce: BigInt(message.interactor.fid)
        });
        console.log('Smart account:', account);

        const smartAccountClient = createSmartAccountClient({
            account,
            chain: sepolia,
            transport: http(bundlerUrl),
            sponsorUserOperation: paymasterClient.sponsorUserOperation,
        }).extend(bundlerActions).extend(pimlicoBundlerActions);
        console.log('Smart account client:', smartAccountClient);

        const gasPrices = await smartAccountClient.getUserOperationGasPrice();
        console.log('Gas prices:', gasPrices);

        const callData = await account.encodeCallData({ 
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", 
            data: "0x1234",
            value: BigInt(0) 
        });
        console.log('Encoded call data:', callData);

        const userOperation = await smartAccountClient.prepareUserOperationRequest({
            userOperation: {
                callData
            },
        });
        console.log('User operation:', userOperation);

        userOperation.signature = await account.signUserOperation(userOperation);
        console.log('User operation with signature:', userOperation);

        const userOpHash = await smartAccountClient.sendUserOperation({
            userOperation,
            entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
        });
        console.log('User operation hash:', userOpHash);

        const response = getFrameHtmlResponse({
            buttons: [
                {
                    label: `View Smart Account`,
                    action: "post_redirect"
                },
            ],
            image: `${NEXT_PUBLIC_URL}/api/og?address=${account.address}&fid=${message.interactor.fid}&userOpHash=${userOpHash}`,
            post_url: `${NEXT_PUBLIC_URL}/api/etherscan`,
        });
        console.log('Frame HTML response:', response);

        return new NextResponse(response);
    } catch (err) {
        console.error('Error occurred:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
