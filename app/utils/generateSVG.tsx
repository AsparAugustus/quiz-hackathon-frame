import { ImageResponse } from 'next/og'


export async function generateSVG(question : string, options = {}) {
  const imageData = await fetch(
    new URL('./park-2.png', import.meta.url)
  ).then((res) => res.arrayBuffer())
  

  
    const component: JSX.Element = (
        <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* @ts-ignore */}
        <img width="1200" height="630" alt="meme" src={imageData} />
        <p
          style={{
            position: 'absolute',
            margin: 0,
            paddingBottom: 20,
            color: '#ffffff',
            lineHeight: 1,
            fontSize: 100,
            fontFamily: '"Oswald Bold"',
            textAlign: 'center',
            textTransform: 'uppercase',
            textShadow:
              '5px 5px 3px #000, -5px 5px 3px #000, -5px -5px 0 #000, 5px -5px 0 #000',
          }}
        >
          {question}
        </p>
      </div>
        
      );

      
  const svg = new ImageResponse(component, {
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
