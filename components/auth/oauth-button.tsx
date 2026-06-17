'use client'

import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface OAuthButtonProps {
  provider: 'google' | 'apple'
  icon: React.ReactNode
  label: string
}

export function OAuthButton({ provider, icon, label }: OAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleOAuthClick = async () => {
    setIsLoading(true)

    try {
      // OAuth integration not yet configured - show informational message
      toast.info(`${label} integration coming soon. Please use email/password to sign in.`)
      setIsLoading(false)
      
      // When OAuth is properly configured with credentials, uncomment the code below:
      // try {
      //   await authClient.signIn.social({
      //     provider: provider,
      //   })
      // } catch (error) {
      //   setIsLoading(false)
      //   toast.error(`Failed to sign in with ${label}`)
      //   console.error('[v0] OAuth error:', error)
      // }
    } catch (error) {
      setIsLoading(false)
      console.error('[v0] OAuth button error:', error)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={handleOAuthClick}
      className="w-full"
      size="lg"
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        icon
      )}
      {label}
    </Button>
  )
}
