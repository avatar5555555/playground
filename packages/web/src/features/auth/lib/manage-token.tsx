import cookie from 'cookie'

export const storeToken = (token: string): void => {
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  })
}
