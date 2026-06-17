'use client'

import Link from 'next/link'
import { EmailPasswordForm } from './email-password-form'
import { OAuthButton } from './oauth-button'
import { AuthDivider } from './auth-divider'
import { GoogleIcon } from './icons/google-icon'
import { AppleIcon } from './icons/apple-icon'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

export function AuthForm({ mode }: AuthFormProps) {
  const isSignIn = mode === 'sign-in'

  return (
    <div className="w-full max-w-sm space-y-6">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isSignIn ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignIn
            ? 'Sign in to your account to continue'
            : 'Create a new account to get started'}
        </p>
      </div>

      {/* OAuth Options */}
      <div className="space-y-3">
        <OAuthButton
          provider="google"
          icon={<GoogleIcon className="mr-2 h-4 w-4" />}
          label={`${isSignIn ? 'Sign in' : 'Sign up'} with Google`}
        />
        <OAuthButton
          provider="apple"
          icon={<AppleIcon className="mr-2 h-4 w-4" />}
          label={`${isSignIn ? 'Sign in' : 'Sign up'} with Apple`}
        />
      </div>

      <AuthDivider />

      {/* Email/Password Form */}
      <EmailPasswordForm mode={mode} />

      {/* Footer */}
      <div className="text-center text-sm">
        {isSignIn ? (
          <>
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </>
        )}
      </div>

      {/* Security Note */}
      <p className="text-center text-xs text-muted-foreground">
        Your data is encrypted and secure. We never share your information.
      </p>
    </div>
  )
}
