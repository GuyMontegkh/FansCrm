import { useAppToast } from '@/hooks/useAppToast';
import { ROUTES } from '@/lib/routes';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InputEmail } from '../ui/InputEmail';
import { InputPassword } from '../ui/inputPassword';
import { useAuth } from '@/context/AuthProvider';
import { useUserLogin } from '@/api/hooks';
import { Link } from 'react-router-dom';

type TFormValues = {
  email: string;
  password: string;
};

export const SingInForm = () => {
  const { errorToast, successToast } = useAppToast();
  const { login } = useAuth();

  const { register, handleSubmit, setValue, formState, control, watch } = useForm<TFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: userLogin, isPending } = useUserLogin();

  const onSubmit = async (values: TFormValues) => {
    userLogin(values, {
      onSuccess: (response) => {
        login(response);
        successToast({ title: 'Logged in successfully' });
      },
      onError: (error: any) => {
        errorToast({ description: error.response?.data?.message || 'Login failed' });
        console.error(error);
      },
    });
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
        </Stack>
        <Stack w="100%" pt="30px">
          <Button
            height="50px"
            loadingText="Submitting"
            isLoading={formState.isSubmitting || isPending}
            type="submit"
            variant="main"
          >
            Sign In
          </Button>
        </Stack>
        <Flex pt="24px" gap={1}>
          <Text textAlign={'center'} fontFamily="Proxima-Nova" fontSize="14px" fontWeight={400}>
            Don’t have an account?{' '}
          </Text>
          <Link to={ROUTES.SIGN_UP}>
            <Text fontFamily="Proxima-Nova" fontSize="14px" fontWeight={400} color="blueRibbon">
              Sign up here
            </Text>
          </Link>
        </Flex>
      </form>
    </Flex>
  );
};
