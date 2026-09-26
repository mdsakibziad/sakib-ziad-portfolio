import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '1:1 AI Creative & Automation Advisory for Beauty Brands | Sakib Ziad'
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
          backgroundColor: '#0B0B0A',
          backgroundImage:
            'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.08) 0%, transparent 60%)',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
              }}
            />
            <span
              style={{
                fontSize: '15px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
              }}
            >
              Sakib Ziad // Private Advisory
            </span>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Application Only
          </div>
        </div>

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
              fontSize: '54px',
              lineHeight: 1.1,
              color: '#ffffff',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Strategic AI Counsel for Beauty Brands That Mean Business.
          </h1>
          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.4,
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
            }}
          >
            Private advisory spanning AI-native creative direction and custom brand automation systems.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '24px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>Creative Audits</span>
            <span>·</span>
            <span>Campaign Systems</span>
            <span>·</span>
            <span>Automation Builds</span>
          </div>

          <span
            style={{
              color: '#ffffff',
              fontSize: '15px',
              letterSpacing: '0.1em',
              fontWeight: 500,
            }}
          >
            sakibziad.com/consulting
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
