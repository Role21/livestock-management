// server/api/auth/logout.post.js
export default defineEventHandler(() => {
    // For JWTs, logging out is done on the client (remove token from localStorage or cookies)
    return { message: 'Logout handled on client. No server action required for JWT.' }
  })
  