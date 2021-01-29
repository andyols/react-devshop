import { UpdatePasswordForm, VerifyPasswordForm } from 'components/Auth'
import { useState } from 'react'

const PasswordForm = () => {
  const [verified, setVerified] = useState(false)

  return verified ? (
    <UpdatePasswordForm />
  ) : (
    <VerifyPasswordForm handleVerify={() => setVerified(true)} />
  )
}

export default PasswordForm
