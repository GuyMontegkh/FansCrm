import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { ROUTES } from '@/lib/routes';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <Flex flexDir={'column'} alignItems={'center'} gap={8} py={10}>
        <Heading
          as="h1"
          fontSize={['2xl', '4xl']}
          fontWeight="bold"
          color="blueRibbon"
          textAlign="center"
        >
          Welcome
        </Heading>
        <Text fontSize={['md', 'lg']} color="nobel" textAlign="center" maxW="md">
          Ready to get started? Choose an option below to log in or register
        </Text>
        <Flex gap={5}>
          <Button
            w={'110px'}
            onClick={() => navigate(ROUTES.SIGN_IN)}
            size="lg"
            borderRadius="md"
            px={6}
          >
            Sign In
          </Button>
          <Button
            w={'110px'}
            onClick={() => navigate(ROUTES.SIGN_UP)}
            size="lg"
            borderRadius="md"
            px={6}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </AuthLayout>
  );
};

export default HomePage;
