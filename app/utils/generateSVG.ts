import satori from 'satori'

export async function generateSVG(text, options = {}) {
  const component = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '48px', margin: 0 }}>{text}</h1>
    </div>
  );

  const svg = await satori(component, options);
  return svg;
}
