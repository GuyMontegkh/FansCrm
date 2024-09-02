import { useState, memo } from 'react';
import {
  Divider,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useMediaQuery,
  Text,
} from '@chakra-ui/react';
import { LockIcon } from '@/assets/icons/LockIcon';
import { EyeIcon } from '@/assets/icons/EyeIcon';
import { ValidCheckIcon } from '@/assets/icons/ValidCheckIcon';
import { InvalidWarningIcon } from '@/assets/icons/InvalidWarningIcon';
import { UseFormRegister, Control, useWatch } from 'react-hook-form';
import { CrossedOutEyeIcon } from '@/assets/icons/CrossedOutEyeIcon';
import { RESOLUTIONS } from '@/lib/constants';
import { passwordValidation, repeatPasswordValidation } from '@/lib/validations/formValidation';

const getErrorMessage = (error: string | undefined) => {
  if (!error) return '';

  const passwordComplexityError = (
    <Flex fontSize="10px" fontFamily="Proxima-Nova" flexDirection="column" gap="7px">
      <Text color="white" fontWeight={700}>
        Password must contain:
      </Text>
      <Text fontWeight={400} color="concrete" opacity="0.3">
        1 Uppercase letter
      </Text>
      <Text fontWeight={400} color="concrete" opacity="0.3">
        {'1 Special Character- !"$%^@'}
      </Text>
      <Text fontWeight={400} color="concrete" opacity="0.3">
        1 Lowercase letter
      </Text>
    </Flex>
  );

  switch (error) {
    case 'pattern':
      return passwordComplexityError;
    default:
      return error;
  }
};

interface IInputPasswordProps {
  name?: string;
  control?: Control<any>;
  register: UseFormRegister<any>;
  error?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

const mobileModifiers = [
  {
    name: 'offset',
    options: {
      offset: [-66, 20],
    },
  },
];

export const InputPassword = memo(
  ({
    name = 'password',
    control,
    register,
    error,
    placeholder = 'Password',
    isDisabled,
  }: IInputPasswordProps) => {
    const [isMobile] = useMediaQuery(RESOLUTIONS.MOBILE);
    const errorPlacement = isMobile ? 'top' : 'right';
    const fieldValue = useWatch({ name: name, control });
    const passwordValue = useWatch({ name: 'password', control });

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const validation =
      name === 'password' ? passwordValidation : repeatPasswordValidation(() => passwordValue);

    const isValid =
      name === 'password'
        ? passwordValidation.pattern.value.test(fieldValue)
        : fieldValue === passwordValue && !error;

    const validationIcon = isValid ? <ValidCheckIcon /> : error ? <InvalidWarningIcon /> : null;

    const showValidationIcon = error || fieldValue;

    return (
      <FormControl isInvalid={!!error}>
        <InputGroup alignItems="center">
          <InputLeftElement pointerEvents="none" px="10px" left="14px" top="7px">
            <LockIcon color={'nobel'} />
          </InputLeftElement>
          <Input
            {...register(name, validation)}
            id={name}
            type={show ? 'text' : 'password'}
            placeholder={placeholder}
            isDisabled={isDisabled}
            bgColor="sharkDark"
            width="100%"
            minW={['100%', '345px']}
            height="54px"
            py="10px"
            pl="54px"
            fontFamily="Proxima-Nova"
            color="concrete"
            borderColor={showValidationIcon ? 'blueRibbonLight' : 'shark'}
            borderRadius={['30px', '44px']}
            _hover={{ borderColor: 'shark' }}
            _focusVisible={{
              outline: 'none',
            }}
            _placeholder={{
              color: 'nobel',
              fontSize: '16px',
            }}
          />
          <Tooltip
            placement={errorPlacement}
            bgColor="sharkDark"
            label={getErrorMessage(error)}
            hasArrow
            isOpen={!!error}
            color="error"
            px="12px"
            py="10px"
            borderRadius="6px"
            fontSize={['10px', '12px']}
            fontFamily="Proxima-Nova"
            shouldWrapChildren
            gutter={10}
            modifiers={isMobile ? mobileModifiers : []}
          >
            <InputRightElement h={'full'} right="30px">
              {showValidationIcon && (
                <Flex gap="8px" alignItems="center">
                  <IconButton
                    position="relative"
                    top="2px"
                    aria-label="Eye icon"
                    onClick={handleClick}
                    bgColor="transparent"
                    width="24px"
                    height="24px"
                    borderRadius="50%"
                    _hover={{
                      bgColor: 'transparent',
                    }}
                  >
                    {show ? <CrossedOutEyeIcon /> : <EyeIcon />}
                  </IconButton>
                  <Divider orientation="vertical" height="28px" borderColor="shark" />
                  {validationIcon}
                </Flex>
              )}
            </InputRightElement>
          </Tooltip>
        </InputGroup>
      </FormControl>
    );
  },
);

InputPassword.displayName = 'InputPassword';
