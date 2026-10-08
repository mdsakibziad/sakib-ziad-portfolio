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
                width: '8px',
                height: '8px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
              }}
            />
            <span
              style={{
                fontSize: '15px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#fafafa',
                fontWeight: 600,
              }}
            >
              Sakib Ziad
            </span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              border: '1px solid #333333',
              backgroundColor: '#171717',
              color: '#d4d4d4',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 500,
              borderRadius: '9999px',
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
            gap: '20px',
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: '56px',
              lineHeight: 1.1,
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            AI Creative Strategist & AI Commercial Director
          </h1>
          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.5,
              color: '#a3a3a3',
              margin: 0,
            }}
          >
            Planning strategy and direct-response hooks for beauty and skincare brands, directing AI-made films and visuals that convert.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #262626',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '24px',
              color: '#737373',
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>Founder, Witlyn Studio</span>
            <span>·</span>
            <span>BSc in Artificial Intelligence</span>
            <span>·</span>
            <span>Concept Campaigns</span>
          </div>

          <span
            style={{
              color: '#ffffff',
              fontSize: '15px',
              letterSpacing: '0.05em',
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
