import { ButtonGroup, useBreakpointValue } from '@chakra-ui/react'
import { PrimaryButton, SecondaryButton } from 'components/Shared'
import React from 'react'

const FormButtons = ({
  isLoading,
  disabled,
  primaryIcon,
  primaryLabel,
  secondaryIcon,
  secondaryLabel,
  secondaryAction,
  variant,
  ...rest
}) => {
  const buttonLayout = useBreakpointValue(['column', 'row'])
  return (
    <ButtonGroup
      d='flex'
      direction={secondaryAction ? buttonLayout : 'column'}
      py={3}
      justifyContent='space-between'
      variant={variant && variant}
      {...rest}
    >
      {secondaryAction && (
        <SecondaryButton
          type='button'
          label={secondaryLabel && secondaryLabel}
          onClick={secondaryAction && secondaryAction}
          leftIcon={secondaryIcon && secondaryIcon}
          isLoading={isLoading}
          disabled={disabled}
        />
      )}
      <PrimaryButton
        type='submit'
        label={primaryLabel}
        rightIcon={primaryIcon}
        isLoading={isLoading}
        disabled={disabled}
      />
    </ButtonGroup>
  )
}

export default FormButtons
