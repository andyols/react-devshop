import { useState } from 'react'
import { UpdatePasswordForm, VerifyPasswordForm } from '.'

const PasswordFormSwapper = () => {
  const [verified, setVerified] = useState(false)

  return verified ? (
    <UpdatePasswordForm />
  ) : (
    <VerifyPasswordForm handleVerify={() => setVerified(true)} />
  )
}

export default PasswordFormSwapper
