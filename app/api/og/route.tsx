import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'MKX Technologies | Enterprise Solutions'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#0a0a0a',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
             <div style={{
                borderRadius: '50%',
                height: '80px',
                width: '80px',
                backgroundColor: '#A70400',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
             }}>
                <span style={{ fontSize: '40px', fontWeight: 'bold', color: 'white' }}>MKX</span>
             </div>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '60px',
              fontStyle: 'normal',
              color: 'white',
              marginTop: '30px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
              fontWeight: 'bold',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '30px',
              fontStyle: 'normal',
              color: '#a3a3a3',
              marginTop: '20px',
            }}
          >
            HRMS • CRMS • POS Systems
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
