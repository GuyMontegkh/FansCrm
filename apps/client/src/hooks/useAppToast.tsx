import { Flex, useToast, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { SuccessIcon } from '@/assets/icons/toast/SuccessIcon';
import { ErrorIcon } from '@/assets/icons/toast/ErrorIcon';
import { WarningIcon } from '@/assets/icons/toast/WarningIcon';
import { CloseToastIcon } from '@/assets/icons/toast/CloseToastIcon';

const Layout = ({
  title,
  children,
  type,
  onClose,
}: {
  title: ReactNode;
  type: 'success' | 'info' | 'error';
  children: ReactNode;
  onClose: () => void;
}) => {
  const colorsMap = {
    success: {
      borderColor: '#014FEF',
      bg: '#1D1D24',
    },
    error: {
      borderColor: '#F26464',
      bg: '#1D1D24',
    },
    info: {
      borderColor: '#FCE371',
      bg: '#1D1D24',
    },
  };

  const iconsMap = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    info: <WarningIcon />,
  };

  const activeIcon = iconsMap[type];

  const activeColor = colorsMap[type];

  return (
    <Flex
      pr="15px"
      pl="18px"
      py="8px"
      maxW="268px"
      border="1px solid"
      borderRadius="10px"
      color="#F3F3F3"
      borderColor={activeColor.borderColor}
      bg={activeColor.bg}
      flexDirection="column"
      gap="8px"
    >
      <Flex alignItems="center" justifyContent="space-between" gap="8px" width="100%">
        <Flex gap="8px" alignItems="center">
          <Flex>{activeIcon}</Flex>
          {title && (
            <Text
              fontFamily="Proxima-Nova"
              fontSize="14px"
              fontWeight={600}
              color="concrete"
              maxW="180px"
            >
              {title}
            </Text>
          )}
        </Flex>
        <Flex as="button" justifySelf="end" onClick={onClose}>
          <CloseToastIcon />
        </Flex>
      </Flex>
      {children && (
        <Flex>
          <Text
            fontFamily="Proxima-Nova"
            fontSize="12px"
            fontWeight={400}
            color="silver"
            maxW="220px"
          >
            {children}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
export const useAppToast = () => {
  const toast = useToast();

  const successToast = ({
    title = 'Success!',
    description,
  }: {
    title?: ReactNode;
    description?: ReactNode;
  }) =>
    toast({
      position: 'top-right',
      title,
      description,
      render: ({ description, title, onClose }) => (
        <Layout type="success" title={title} onClose={onClose}>
          {description}
        </Layout>
      ),
      isClosable: true,
    });
  const infoToast = ({
    title = 'Info!',
    description,
  }: {
    title?: ReactNode;
    description?: ReactNode;
  }) =>
    toast({
      position: 'top-right',
      title,
      description,
      render: ({ description, title, onClose }) => (
        <Layout type="info" title={title} onClose={onClose}>
          {description}
        </Layout>
      ),
      isClosable: true,
    });
  const errorToast = ({
    title = 'Error!',
    description,
    duration = 5000,
  }: {
    title?: ReactNode;
    description?: ReactNode;
    duration?: number;
  }) =>
    toast({
      position: 'top-right',
      title,
      description,
      duration,
      render: ({ title, description, onClose }) => (
        <Layout type="error" title={title} onClose={onClose}>
          {description}
          <br />
        </Layout>
      ),
      isClosable: true,
    });

  return { successToast, infoToast, errorToast };
};
