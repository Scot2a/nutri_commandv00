import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { AuthForm } from '@/components/auth/auth-form'

export const metadata = {
  title: 'Create Account | NutriCommand',
  description: 'Create a new NutriCommand account',
}

export default async function SignUpPage() {
  // Redirect authenticated users away from sign-up
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/10 px-4 py-12">
      <div className="w-full max-w-sm">
        <AuthForm mode="sign-up" />
      </div>
    </div>
  )
}
