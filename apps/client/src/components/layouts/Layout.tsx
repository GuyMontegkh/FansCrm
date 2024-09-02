import { ReactNode, useEffect } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { ROUTES } from '@/lib/routes';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { Header } from './Header';

export const Layout = ({ children, ...rest }: { children: ReactNode } & FlexProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated]);
  return (
    <Flex flexDir="column" flex="1 1 auto" overflowY="hidden">
      <Header />
      <Flex
        flex="1 1 auto"
        px={['16px', '130px']}
        alignItems="center"
        flexDir="column"
        overflow="hidden"
        bgColor="woodsmoke"
        className="content"
        {...rest}
      >
        {children}
      </Flex>
    </Flex>
  );
};
