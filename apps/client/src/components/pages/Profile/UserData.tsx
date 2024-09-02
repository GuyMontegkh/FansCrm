import { useUserInfo } from '@/api/hooks';
import { useAuth } from '@/context/AuthProvider';
import { Flex, SkeletonText, Text, Box } from '@chakra-ui/react';
import dayjs from 'dayjs';

const UserData = () => {
  const { user } = useAuth();
  const { data, isLoading } = useUserInfo(
    user ? { id: user.id, enabled: !!user.id } : { id: 0, enabled: false },
  );

  return (
    <Box p={4} bg="sharkDark" borderRadius="md" boxShadow="md">
      <Flex flexDir="column" gap={4}>
        <Flex gap={[2, 6]} align="center">
          {isLoading ? (
            <SkeletonText height="30px" width="150px" noOfLines={1} />
          ) : (
            <>
              <Text color="whitesmoke" fontWeight="bold" fontSize="lg">
                User email:
              </Text>
              <Text color="gray.200" fontSize="lg">
                {data?.email}
              </Text>
            </>
          )}
        </Flex>
        <Flex gap={[2, 6]} align="center" justifyContent={'space-between'}>
          {isLoading ? (
            <SkeletonText height="30px" width="150px" noOfLines={1} />
          ) : (
            <>
              <Text color="whitesmoke" fontWeight="bold" fontSize="lg">
                Registration date:
              </Text>
              <Text color="gray.200" fontSize="lg">
                {dayjs(data?.createdAt).format('YYYY/MM/DD')}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default UserData;
