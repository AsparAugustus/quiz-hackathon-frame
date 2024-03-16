import satori from 'satori'

export async function generateSVG(question : string, options = {}) {
    const component: JSX.Element = (
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '48px', margin: 0 }}>{question}</h1>
        </div>
        
      );

      
  const svg = await satori(component, options);
  return svg;
}
