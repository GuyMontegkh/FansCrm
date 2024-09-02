import { Flex } from '@chakra-ui/react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { SingInForm } from '@/components/forms/SingInForm';
import { AuthNavBar } from '@/components/pages/AuthNavBar';

const SignInPage = () => {
  return (
    <AuthLayout>
      <Flex
        w={'100%'}
        height="100%"
        flexDirection="column"
        justifyContent={'center'}
        bgColor="woodsmoke"
      >
        <AuthNavBar />
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={['38px', '48px']}
        >
          <SingInForm />
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default SignInPage;
