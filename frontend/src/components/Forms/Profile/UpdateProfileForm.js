import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { requestUserUpdate } from 'api'
import {
  FormButtons,
  FormInput,
  FormWrapper,
  SecondaryHeading
} from 'components/Shared'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiMail, FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const UpdateProfileForm = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { name, email } = auth.user

  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(updateProfileSchema)
  })

  const onSubmit = async (data) =>
    dispatch(authRequest(requestUserUpdate, data, auth.user.token))

  useEffect(() => {
    if (!auth.loading) {
      reset({ name, email })
    }
  }, [auth.loading, reset, name, email])

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <SecondaryHeading text='Public Profile' fontSize='lg' pt={3} />
      <Divider />
      <FormInput
        id='name'
        error={errors.name}
        ref={register}
        leftAddon={<FiUser />}
        label='Name'
        disabled={auth.loading}
      />
      <FormInput
        id='email'
        label='Email'
        error={errors.email}
        ref={register}
        leftAddon={<FiMail />}
        disabled={auth.loading}
      />
      <FormButtons
        primaryLabel='Update Profile'
        secondaryAction={() => reset()}
        secondaryLabel='Reset'
        isLoading={auth.loading}
        disabled={auth.loading}
        size='sm'
        justify='flex-start'
      />
    </FormWrapper>
  )
}

export default UpdateProfileForm
