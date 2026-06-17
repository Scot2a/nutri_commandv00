# Secure Authentication Implementation - NutriCommand

## Overview

A modular, production-ready authentication system built with Better Auth + Neon Postgres database, supporting:
- **Email/Password** authentication (sign-in & sign-up)
- **Google OAuth** (ready for configuration)
- **Apple OAuth** (ready for configuration)

## Architecture

### Core Files Structure

```
lib/
├── auth.ts                    # Better Auth server config
├── auth-client.ts             # Better Auth client for browser
└── db/
    ├── index.ts               # Drizzle ORM + pg Pool
    └── schema.ts              # Database schema (Better Auth tables)

app/
├── api/auth/[...all]/route.ts # OAuth & session endpoint
├── (auth)/
│   ├── login/page.tsx         # Sign-in page
│   └── sign-up/page.tsx       # Sign-up page

components/auth/
├── auth-form.tsx              # Main form wrapper
├── email-password-form.tsx    # Email/password form (modular)
├── oauth-button.tsx           # OAuth button component (modular)
├── auth-divider.tsx           # Visual divider
└── icons/
    ├── google-icon.tsx        # Google SVG icon
    └── apple-icon.tsx         # Apple SVG icon
```

## Security Features

### 1. Password Security
- Minimum 8 characters validation
- Password hashing via Better Auth (bcrypt-based)
- Passwords never exposed in error messages
- "Invalid email or password" generic error (prevents enumeration attacks)

### 2. Session Management
- 7-day session expiration
- 1-day update age (requires re-auth after inactivity)
- CSRF protection via Better Auth
- Cross-site cookie handling for iframe preview

### 3. Data Validation
- Email format validation with regex
- Server-side validation for all inputs
- Type-safe forms with TypeScript
- No PII in error messages or logs

### 4. OAuth Ready
- Google OAuth structure in place (requires credentials)
- Apple OAuth structure in place (requires credentials)
- Modular design for easy credential updates
- Graceful fallback to email/password when OAuth unavailable

## Installation & Setup

### 1. Environment Variables Required

```bash
# Required
DATABASE_URL=postgresql://...          # Neon database URL
NEON_AUTH_COOKIE_SECRET=...            # Random 32+ char string

# Optional (for OAuth when configured)
GOOGLE_CLIENT_ID=...                   # From Google Cloud Console
GOOGLE_CLIENT_SECRET=...               # From Google Cloud Console
APPLE_CLIENT_ID=...                    # From Apple Developer Account
APPLE_CLIENT_SECRET=...                # From Apple Developer Account
```

### 2. Database Initialization

Better Auth automatically creates required tables on first use:
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth account links
- `verification` - Email verification tokens

### 3. Enable OAuth (Future Steps)

When ready to enable OAuth:

1. **Google OAuth:**
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Set authorized redirect URI: `https://yourdomain.com/api/auth/callback/google`
   - Add credentials to environment

2. **Apple OAuth:**
   - Go to Apple Developer Account
   - Create App ID with Sign in with Apple capability
   - Create Service ID and Private Key
   - Set redirect URI: `https://yourdomain.com/api/auth/callback/apple`
   - Add credentials to environment

3. **Uncomment in `lib/auth.ts`:**
   ```typescript
   plugins: [
     google({ clientId: ..., clientSecret: ... }),
     apple({ clientId: ..., clientSecret: ... }),
   ]
   ```

## Modular Components

### EmailPasswordForm
Handles sign-in and sign-up with:
- Email validation
- Password requirements (8+ chars)
- Full name field (sign-up only)
- Inline error messages
- Loading states with spinner

**Usage:**
```tsx
<EmailPasswordForm mode="sign-in" />
<EmailPasswordForm mode="sign-up" />
```

### OAuthButton
Reusable button for any OAuth provider:
- Custom icons (Google/Apple)
- Loading state management
- Error handling
- Graceful fallback message

**Usage:**
```tsx
<OAuthButton 
  provider="google" 
  icon={<GoogleIcon />} 
  label="Sign in with Google" 
/>
```

### AuthDivider
Visual separator between OAuth and email/password sections

### AuthForm
Complete authentication UI combining all components:
- OAuth options first (faster for returning users)
- Divider
- Email/password form
- Footer with sign-in/sign-up toggle
- Security note

## API Routes

### `/api/auth/[...all]`
Better Auth HTTP handler - manages:
- Session creation/validation
- Password verification
- OAuth callbacks
- Session refresh
- CSRF protection

## User Flow

### Sign-Up
1. Click "Create Account"
2. Optionally try Google/Apple (when configured)
3. Or fill email/password/name
4. Submit → account created → redirect to home
5. Auto-logged in via session cookie

### Sign-In
1. Click "Sign In" 
2. Optionally try Google/Apple (when configured)
3. Or enter email/password
4. Submit → session created → redirect to home

### Protected Routes
All routes that require auth should:
1. Check session with `await auth.api.getSession({ headers: await headers() })`
2. Redirect to `/login` if no session
3. Use `getUserId()` for database queries

## Database Schema

### User Table
```sql
CREATE TABLE "user" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  emailVerified BOOLEAN DEFAULT false,
  name TEXT,
  image TEXT,
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP
)
```

### Session Table
```sql
CREATE TABLE "session" (
  id TEXT PRIMARY KEY,
  userId TEXT REFERENCES user(id),
  expiresAt TIMESTAMP NOT NULL,
  token TEXT UNIQUE NOT NULL
)
```

## Security Best Practices

✅ **Implemented:**
- Password hashing (Better Auth)
- CSRF protection
- Session validation
- Input validation
- Generic error messages
- No PII in logs
- Secure cookie attributes
- Rate limiting ready (add via middleware if needed)

⚠️ **Recommendations:**
- Add rate limiting on login endpoint (prevent brute force)
- Monitor failed login attempts
- Implement password reset flow
- Add email verification before sign-up
- Use HTTPS in production
- Set secure cookie flags for production

## Testing the Implementation

### Test Sign-Up
1. Go to `/sign-up`
2. Enter: name, email, password (8+ chars)
3. Submit → should redirect to home

### Test Sign-In
1. Go to `/login`
2. Enter: email, password from signup
3. Submit → should redirect to home

### Test OAuth
1. Buttons visible and styled correctly
2. Click Google/Apple → shows info message (until configured)

### Test Session Persistence
1. Sign in → check browser cookies
2. Refresh page → should stay logged in
3. Visit protected route → should have access

## Troubleshooting

### "You are using the default secret" Error
- Set `NEON_AUTH_COOKIE_SECRET` environment variable
- Generate with: `openssl rand -base64 32`

### OAuth Not Working
- Verify credentials in environment variables
- Check redirect URI matches provider settings
- Uncomment plugins in `lib/auth.ts`
- Restart dev server

### Session Lost on Refresh
- Check browser cookies are enabled
- Verify `BETTER_AUTH_URL` environment variable
- In dev: check cross-site cookie settings

## Future Enhancements

- [ ] Email verification workflow
- [ ] Password reset flow
- [ ] Multi-factor authentication (MFA)
- [ ] Account deletion
- [ ] Profile edit page
- [ ] Social account linking
- [ ] Rate limiting middleware
- [ ] Login attempt logging
- [ ] Session management UI

## File Manifest

| File | Purpose | Status |
|------|---------|--------|
| `lib/auth.ts` | Better Auth config | ✅ Production |
| `lib/auth-client.ts` | Client-side auth API | ✅ Production |
| `lib/db/index.ts` | Drizzle + Pool setup | ✅ Production |
| `lib/db/schema.ts` | Database schema | ✅ Production |
| `app/api/auth/[...all]/route.ts` | Auth handler | ✅ Production |
| `app/(auth)/login/page.tsx` | Sign-in page | ✅ Production |
| `app/(auth)/sign-up/page.tsx` | Sign-up page | ✅ Production |
| `components/auth/auth-form.tsx` | Main form UI | ✅ Production |
| `components/auth/email-password-form.tsx` | Email/pass form | ✅ Production |
| `components/auth/oauth-button.tsx` | OAuth button | ✅ Ready for OAuth |
| `components/auth/auth-divider.tsx` | Visual divider | ✅ Production |
| `components/auth/icons/google-icon.tsx` | Google icon | ✅ Production |
| `components/auth/icons/apple-icon.tsx` | Apple icon | ✅ Production |

## Support

For OAuth setup help, refer to:
- [Google Cloud Console](https://console.cloud.google.com/)
- [Apple Developer Account](https://developer.apple.com/)
- [Better Auth Documentation](https://www.better-auth.com/)
