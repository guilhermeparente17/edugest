import {
  GraduationCap,
  Eye,
  EyeOff,
  AlertCircle,
  BookOpen,
  Shield,
} from 'lucide-react'
import { useState } from 'react'
import { DEMO_CREDS, type Icon, type Role } from './type'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema, type LoginFormData } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

const Login = () => {
  const [role, setRole] = useState<Role>('admin')
  const [showPass, setShowPass] = useState(false)
  const [err, setErr] = useState('')

  const roleOpts: { role: Role; label: string; desc: string; icon: Icon }[] = [
    { role: 'admin', label: 'Admin', desc: 'Gestão total', icon: Shield },
    {
      role: 'professor',
      label: 'Professor',
      desc: 'Notas e aulas',
      icon: BookOpen,
    },
    {
      role: 'aluno',
      label: 'Aluno',
      desc: 'Meu boletim',
      icon: GraduationCap,
    },
  ]

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: '',
      pass: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErr('')

      console.log(data)

      // await login(data);
    } catch (error) {
      setErr('Usuário ou senha inválidos')
    }
  }
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex w-[42%] bg-primary flex-col justify-between p-12">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-400 rounded-md flex items-center justify-center">
            <GraduationCap size={15} className="text-primary" />
          </div>
          <span className="text-white font-bold">EduGest</span>
        </div>

        <div>
          <p className="text-white/40 text-[15px] uppercase tracking-widest mb-4 font-mono">
            Sistema de Gestão Escolar
          </p>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-5">
            Escola
            <br />
            Integrada.
            <br />
            Conectada.
          </h1>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs">
            Plataforma completa para administração, corpo docente e alunos do
            Colégio Estadual Dom Pedro II.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { v: '847', l: 'Alunos' },
              { v: '42', l: 'Professores' },
              { v: '28', l: 'Turmas' },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-lg px-3 py-3 border border-white/10"
              >
                <p className="text-white font-bold text-xl">{s.v}</p>
                <p className="text-white/40 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs font-mono">
          © 2024 EduGest · v2.4.1
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <GraduationCap size={13} className="text-white" />
            </div>
            <span className="font-bold text-sm">EduGest</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Entrar</h2>
          <p className="text-sm text-muted-foreground mb-7">
            Selecione seu perfil e acesse o sistema
          </p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roleOpts.map(({ role: r, label, desc, icon: Icon }) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r)
                  setErr('')
                }}
                className={`p-3 rounded-lg border text-left transition-all ${
                  role === r
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-card hover:border-primary/30 text-foreground'
                }`}
              >
                <Icon
                  size={15}
                  className={
                    role === r ? 'text-amber-400' : 'text-muted-foreground'
                  }
                />
                <p className="text-xs font-semibold mt-2">{label}</p>
                <p
                  className={`text-[10px] mt-0.5 ${role === r ? 'text-white/55' : 'text-muted-foreground'}`}
                >
                  {desc}
                </p>
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">
                Usuário
              </label>

              <Controller
                name="user"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder={DEMO_CREDS[role].user}
                    autoComplete="username"
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-colors"
                  />
                )}
              />

              {errors.user && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.user.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">
                Senha
              </label>

              <div className="relative">
                <Controller
                  name="pass"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-colors pr-10"
                    />
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {errors.pass && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pass.message}
                </p>
              )}
            </div>

            {err && (
              <p className="text-xs text-red-500 flex items-center gap-1.5">
                <AlertCircle size={12} />
                {err}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 active:scale-[0.99] transition-all mt-1 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar no Sistema'}
            </button>
          </form>

          <div className="mt-5 p-3 bg-amber-50 border border-amber-100 rounded-md">
            <p className="text-[11px] text-amber-700 font-semibold mb-0.5">
              Acesso de demonstração
            </p>
            <p className="text-[11px] text-amber-600 font-mono">
              usuário: {DEMO_CREDS[role].user} &nbsp;/&nbsp; senha:{' '}
              {DEMO_CREDS[role].pass}
              credenciais
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
