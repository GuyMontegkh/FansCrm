import { useAppToast } from '@/hooks/useAppToast';
import { ROUTES } from '@/lib/routes';
import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InputEmail } from '../ui/InputEmail';
import { InputPassword } from '../ui/inputPassword';
import { signUpUser } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

type TFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const { errorToast, successToast } = useAppToast();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState, control, watch } = useForm<TFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: TFormValues) => {
    try {
      await signUpUser(values);
      successToast({ title: 'Registration success' });
      navigate(ROUTES.SIGN_IN);
    } catch (error: any) {
      errorToast({ description: error.response.data.message });
      console.error(error);
    }
  };

  return (
    <Flex width={['100%', '392px']} px={['16px', 0]} className="form-wrapper">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="form"
      >
        <Stack w="100%" gap={['16px']} flex={1} className="form-fields">
          <InputEmail
            watch={watch}
            register={register}
            setValue={setValue}
            error={formState.errors.email?.message}
          />
          <InputPassword
            control={control}
            register={register}
            error={formState.errors.password?.message}
          />
          <InputPassword
            name="confirmPassword"
            placeholder="Repeat Password"
            control={control}
            register={register}
            error={formState.errors.confirmPassword?.message}
          />
        </Stack>
        <Stack w="100%" pt="30px">
          <Button
            height="50px"
            loadingText="Submitting"
            isLoading={formState.isSubmitting}
            type="submit"
            variant="main"
          >
            Sign Up
          </Button>
        </Stack>
        <Stack pt="24px">
          <Text textAlign={'center'} fontFamily="Proxima-Nova" fontSize="14px" fontWeight={400}>
            Already have an account?{' '}
            <Link href={ROUTES.SIGN_IN} color="blueRibbon">
              Login here
            </Link>
          </Text>
        </Stack>
      </form>
    </Flex>
  );
};
