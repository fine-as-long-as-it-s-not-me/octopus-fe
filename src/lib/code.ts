export const encode = (code: string) => {
  return btoa(code)
}

export const decode = (encryptedCode: string) => {
  try {
    return atob(encryptedCode)
  } catch {
    return null
  }
}
