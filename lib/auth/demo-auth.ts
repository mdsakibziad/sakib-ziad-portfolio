'use client'

export interface DemoUser {
  id: string
  email: string
  user_metadata: {
    full_name: string
  }
}

const DEMO_USER_KEY = 'witlyn_demo_user'
const DEMO_COOKIE_NAME = 'demo_user'

export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return null
}

export function setDemoUser(user: DemoUser): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
    // Also set document cookie so middleware allows /account
    document.cookie = `${DEMO_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400; SameSite=Lax`
  } catch {
    // ignore
  }
}

export function clearDemoUser(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(DEMO_USER_KEY)
    document.cookie = `${DEMO_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`
  } catch {
    // ignore
  }
}
