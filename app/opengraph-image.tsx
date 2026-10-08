import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Sakib Ziad — Creative Strategist & Commercial Director for Beauty & Skincare'
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
          backgroundColor: '#050609',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          border: '1px solid #292929',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#f4521c',
              }}
            />
            <span
              style={{
                fontSize: '15px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#ece8e1',
                fontWeight: 700,
              }}
            >
              Sakib Ziad // Creative Strategist
            </span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              border: '1px solid #292929',
              backgroundColor: '#0b0c10',
              color: '#f4521c',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Beauty & Skincare
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: '60px',
              lineHeight: 1.0,
              color: '#ece8e1',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            High-Performance Creative Direction For Beauty Brands.
          </h1>
          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.4,
              color: '#8a8a8a',
              margin: 0,
            }}
          >
            Direct-response creative architecture, sensory hook design, and rapid 72-hour studio production.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #292929',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '24px',
              color: '#8a8a8a',
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>Witlyn Founder</span>
            <span>·</span>
            <span>Commercial Director</span>
            <span>·</span>
            <span>Campaign Systems</span>
          </div>

          <span
            style={{
              color: '#ffffff',
              fontSize: '15px',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}
          >
            sakibziad.my
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
