import { Flex } from '@chakra-ui/react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { SignUpForm } from '@/components/forms/SignUpForm';
import { AuthNavBar } from '@/components/pages/AuthNavBar';

const SignUpPage = () => {
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
          <SignUpForm />
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default SignUpPage;
