'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldAlert, Lock, Mail, KeyRound, ArrowRight } from 'lucide-react'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading, signIn } = useAuth()
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passcode, setPasscode] = useState('')
  const [loginMethod, setLoginMethod] = useState<'firebase' | 'passcode'>('passcode')
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const DEFAULT_ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PIN || 'admin123'

  useEffect(() => {
    // Check session storage for admin passcode auth session
    const storedAuth = sessionStorage.getItem('dh_admin_session')
    if (storedAuth === 'true') {
      setIsAdminAuthenticated(true)
    } else if (user) {
      // If Firebase user is logged in
      setIsAdminAuthenticated(true)
    }
  }, [user])

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setIsSubmitting(true)

    if (passcode === DEFAULT_ADMIN_PASSCODE) {
      sessionStorage.setItem('dh_admin_session', 'true')
      setIsAdminAuthenticated(true)
    } else {
      setAuthError('Invalid Admin Passcode/PIN. Please try again.')
    }
    setIsSubmitting(false)
  }

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setIsSubmitting(true)

    try {
      await signIn(email, password)
      sessionStorage.setItem('dh_admin_session', 'true')
      setIsAdminAuthenticated(true)
    } catch (err: any) {
      console.error('Admin login error:', err)
      setAuthError(err.message || 'Failed to authenticate admin credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('dh_admin_session')
    setIsAdminAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4">
        <Card className="w-full max-w-md border-cyan-500/30 bg-gray-900/90 text-white shadow-2xl backdrop-blur-md">
          <CardHeader className="text-center space-y-2 pb-6 border-b border-gray-800">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-extrabold tracking-tight text-white">
              Admin Access Only
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Please enter admin credentials to access DataHunter Dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {authError && (
              <Alert variant="destructive" className="bg-red-950/60 border-red-500/50 text-red-200">
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            {/* Toggle Method */}
            <div className="flex rounded-lg bg-gray-800/80 p-1 border border-gray-700">
              <button
                type="button"
                onClick={() => setLoginMethod('passcode')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  loginMethod === 'passcode'
                    ? 'bg-cyan-500 text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Admin Key / PIN
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('firebase')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  loginMethod === 'firebase'
                    ? 'bg-cyan-500 text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Firebase Email
              </button>
            </div>

            {loginMethod === 'passcode' ? (
              <form onSubmit={handlePasscodeLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passcode" className="text-gray-300 text-xs font-semibold">
                    Admin Passcode / Key
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="passcode"
                      type="password"
                      placeholder="Enter Admin PIN"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  {isSubmitting ? 'Authenticating...' : 'Unlock Admin Panel'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFirebaseLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 text-xs font-semibold">
                    Admin Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@datahunter.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 text-xs font-semibold">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In as Admin'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
