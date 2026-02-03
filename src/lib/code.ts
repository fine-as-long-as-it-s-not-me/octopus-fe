export const encryptCode = (code: string) => {
  return btoa(code)
}

export const decryptCode = (encryptedCode: string) => {
  try {
    return atob(encryptedCode)
  } catch {
    return null
  }
}
