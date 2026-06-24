import type { ComponentType } from 'react'

export type Role = 'admin' | 'professor' | 'aluno'

export type Icon = ComponentType<{ size?: number; className?: string }>

export const DEMO_CREDS: Record<Role, { user: string; pass: string }> = {
  admin: { user: 'admin', pass: 'admin123' },
  professor: { user: 'prof', pass: 'prof123' },
  aluno: { user: 'aluno', pass: 'aluno123' },
}
