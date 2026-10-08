import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Sakib Ziad — AI Creative Strategist & AI Commercial Director'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          border: '1px solid #262626',
        }}
      >
        <span style={{ fontSize: '15px', color: '#fafafa', textTransform: 'uppercase' }}>
          Sakib Ziad
        </span>
        <h1 style={{ fontSize: '48px', color: '#ffffff', fontWeight: 700 }}>
          AI Creative Strategist & AI Commercial Director
        </h1>
        <span style={{ color: '#737373', fontSize: '14px' }}>sakibziad.my</span>
      </div>
    ),
    { ...size }
  )
}
