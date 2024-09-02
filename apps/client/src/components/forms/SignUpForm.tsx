import { useAppToast } from '@/hooks/useAppToast';
import { ROUTES } from '@/lib/routes';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { InputEmail } from '../ui/InputEmail';
import { InputPassword } from '../ui/inputPassword';
import { Link, useNavigate } from 'react-router-dom';
import { useUserSingUp } from '@/api/hooks';

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

  const { mutate: userSignUp, isPending } = useUserSingUp();

  const onSubmit = async (values: TFormValues) => {
    userSignUp(values, {
      onSuccess: () => {
        successToast({ title: 'Registration success' });
        navigate(ROUTES.SIGN_IN);
      },
      onError: (error: any) => {
        errorToast({ description: error.response?.data?.message || 'Registration failed' });
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
            isLoading={formState.isSubmitting || isPending}
            type="submit"
            variant="main"
          >
            Sign Up
          </Button>
        </Stack>
        <Flex pt="24px" gap={1}>
          <Text textAlign={'center'} fontFamily="Proxima-Nova" fontSize="14px" fontWeight={400}>
            Already have an account?{' '}
          </Text>
          <Link to={ROUTES.SIGN_IN}>
            <Text fontFamily="Proxima-Nova" fontSize="14px" fontWeight={400} color="blueRibbon">
              Login here
            </Text>
          </Link>
        </Flex>
      </form>
    </Flex>
  );
};
