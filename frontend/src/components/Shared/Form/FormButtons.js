import { ButtonGroup, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { PrimaryButton, SecondaryButton } from '../Buttons'

const FormButtons = ({
  justify,
  isLoading,
  disabled,
  hidePrimary,
  primaryIcon,
  primaryLabel,
  primaryAction,
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
      justifyContent={justify || 'space-between'}
      direction={secondaryAction ? buttonLayout : 'column'}
      py={3}
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

      {!hidePrimary && (
        <PrimaryButton
          type={primaryAction ? 'button' : 'submit'}
          label={primaryLabel}
          onClick={primaryAction && primaryAction}
          rightIcon={primaryIcon}
          isLoading={isLoading}
          disabled={disabled}
        />
      )}
    </ButtonGroup>
  )
}

export default FormButtons
