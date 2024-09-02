import { useAuth } from '@/context/AuthProvider';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const path = location.pathname.split('/').filter(Boolean).pop() || 'Home';
  const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <Flex
      as="header"
      w="100%"
      bgColor="woodsmoke"
      px={[4, '230px']}
      py={[2, 6]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        fontSize={['lg', '2xl']}
        fontWeight="bold"
        color="whitesmoke"
        textTransform="capitalize"
      >
        {formattedPath}
      </Text>

      <Button onClick={logout} variant="authNav">
        Logout
      </Button>
    </Flex>
  );
};
