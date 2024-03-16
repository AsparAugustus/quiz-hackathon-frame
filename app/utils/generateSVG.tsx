import { ImageResponse } from 'next/og'

export async function generateSVG(question : string, options = {}) {
    const component: JSX.Element = (
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '48px', margin: 0 }}>{question}</h1>
        </div>
        
      );

      
  const svg = await new ImageResponse(component, {
    width: 1200,
    height: 630,
    // fonts: [
    //   {
    //     name: 'Oswald Bold',
    //     data: fontData,
    //     style: 'normal',
    //   },
    // ],
  });
  return svg;
}
