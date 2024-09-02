import { Flex, IconButton, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const AuthNavBar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Flex
      maxWidth={['100%', '560px']}
      w="100%"
      px={['16px', '0']}
      alignItems="center"
      justifyContent={['auto', 'space-between']}
      mx="auto"
      mb={5}
    >
      <IconButton
        icon={<Image src="/arrowBack.svg" alt="Arrow Back" />}
        aria-label="Arrow back"
        onClick={handleGoBack}
        w={['36px', '45px']}
        h={['36px', '45px']}
        borderRadius="50%"
        variant="authNav"
      />
    </Flex>
  );
};
