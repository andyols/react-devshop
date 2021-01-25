import { Stack, useBreakpointValue } from '@chakra-ui/react'
import { PrimaryButton, SecondaryButton } from 'components/Shared'
import React from 'react'

const FormButtons = ({
  isLoading,
  disabled,
  primaryIcon,
  primaryLabel,
  secondaryIcon,
  secondaryLabel,
  secondaryAction
}) => {
  const buttonLayout = useBreakpointValue(['column', 'row'])
  return (
    <Stack
      direction={secondaryAction ? buttonLayout : 'column'}
      py={3}
      justify='space-between'
    >
      {secondaryAction && (
        <SecondaryButton
          type='button'
          label={secondaryLabel && secondaryLabel}
          onClick={secondaryAction && secondaryAction}
          leftIcon={secondaryIcon && secondaryIcon}
        />
      )}
      <PrimaryButton
        type='submit'
        label={primaryLabel}
        isLoading={isLoading}
        disabled={disabled}
        rightIcon={primaryIcon}
      />
    </Stack>
  )
}

export default FormButtons
