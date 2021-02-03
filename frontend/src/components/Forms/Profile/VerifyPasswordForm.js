import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestPasswordVerificaton } from 'api'
import { FormButtons, FormWrapper, PasswordInput } from 'components/Shared/Form'
import { SecondaryHeading } from 'components/Shared/Typography'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { verifyPasswordSchema } from 'schema/formSchemas'
import { verifyPassword } from 'slices/authSlice'

const VerifyPasswordForm = ({ handleVerify }) => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const token = auth.user.token

  const { register, handleSubmit, errors, setError } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(verifyPasswordSchema)
  })

  const onSubmit = async (data) =>
    dispatch(verifyPassword(requestPasswordVerificaton, { ...data, token }))

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(!show)

  useEffect(() => {
    if (auth.user.verified) handleVerify()
  }, [auth.user.verified, handleVerify])

  useEffect(() => {
    if (auth.error) {
      setError('password', {
        type: 'manual',
        message: auth.error
      })
    }
  }, [auth.error, setError])

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SecondaryHeading text='Password' fontSize='lg' pt={3} />
      <Divider />
      <PasswordInput
        id='password'
        label='Current Password'
        help='To update your password, please verify your current password.'
        error={errors.password}
        ref={register}
        show={show}
        handleClick={handleShow}
        disabled={auth.loading}
      />
      <FormButtons
        primaryLabel='Submit'
        isLoading={auth.loading}
        disabled={auth.loading}
        justify='flex-start'
        size='sm'
      />
    </FormWrapper>
  )
}

export default VerifyPasswordForm
