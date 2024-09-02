import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { EmailIcon } from '@/assets/icons/EmailIcon';
import { ValidCheckIcon } from '@/assets/icons/ValidCheckIcon';
import { InvalidWarningIcon } from '@/assets/icons/InvalidWarningIcon';
import { emailValidation } from '@/lib/validations/formValidation';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { RESOLUTIONS } from '@/lib/constants';
import { ChangeEvent } from 'react';

interface IInputEmailProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  error?: string;
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

export const InputEmail = ({ register, watch, setValue, error, isDisabled }: IInputEmailProps) => {
  const [isMobile] = useMediaQuery(RESOLUTIONS.MOBILE);
  const errorPlacement = isMobile ? 'top' : 'right';
  const emailValue = watch('email');
  const isValid = emailValidation.pattern.value.test(emailValue) && !error;

  const validationIcon = isValid ? (
    <ValidCheckIcon position="relative" />
  ) : error ? (
    <InvalidWarningIcon position="relative" />
  ) : null;

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('email', event.target.value.toLowerCase());
  };

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup alignItems="center">
        <InputLeftElement pointerEvents="none" left="14px" top="7px">
          <EmailIcon color={'nobel'} />
        </InputLeftElement>
        <Input
          {...register('email', emailValidation)}
          id="email"
          placeholder="Email"
          isDisabled={isDisabled}
          width="100%"
          minW={['100%', '345px']}
          height="54px"
          py="10px"
          pl="54px"
          fontFamily="Proxima-Nova"
          color="concrete"
          bgColor="sharkDark"
          borderColor={isValid ? 'blueRibbonLight' : 'shark'}
          borderRadius={['30px', '44px']}
          _hover={{ borderColor: 'shark' }}
          _focusVisible={{
            outline: 'none',
          }}
          _placeholder={{
            color: 'nobel',
            fontSize: '16px',
          }}
          onChange={handleEmailChange}
        />
        <Tooltip
          placement={errorPlacement}
          bgColor="sharkDark"
          label={error}
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
          <InputRightElement h={'full'} right="10px">
            {validationIcon}
          </InputRightElement>
        </Tooltip>
      </InputGroup>
    </FormControl>
  );
};
