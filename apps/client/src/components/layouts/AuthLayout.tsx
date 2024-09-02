import { ReactNode, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.PROFILE);
    }
  }, [isAuthenticated]);

  return (
    <Flex flexDir="column" flex="1 1 auto" overflowY="hidden">
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDir="column"
        overflow="hidden"
      >
        {children}
      </Flex>
    </Flex>
  );
};
