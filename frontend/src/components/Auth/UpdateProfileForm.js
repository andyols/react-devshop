import { Divider } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
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
import { updateSchema } from 'schema/formSchemas'
import { authRequest } from 'slices/authSlice'

const UpdateProfileForm = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { _id, name, email, token } = auth.user
  const loaded = !auth.loading

  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(updateSchema)
  })

  const onSubmit = async (data) => {
    dispatch(
      authRequest({
        ...data,
        type: 'update',
        _id,
        token
      })
    )
  }

  useEffect(() => {
    if (loaded) {
      reset({ name, email })
    }
  }, [loaded, name, email, reset])

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
        disabled={!loaded}
      />
      <FormInput
        id='email'
        label='Email'
        error={errors.email}
        ref={register}
        leftAddon={<FiMail />}
        disabled={!loaded}
      />
      <FormButtons
        primaryLabel='Update Profile'
        secondaryAction={() => reset()}
        secondaryLabel='Reset'
        isLoading={!loaded}
        disabled={!loaded}
        size='sm'
        justify='flex-start'
      />
    </FormWrapper>
  )
}

export default UpdateProfileForm
