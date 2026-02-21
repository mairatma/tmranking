import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const LoadingPage = ({ children }: Props) => {
  return (
    <Center>
      <VStack>
        <Spinner size="lg" />
        <Text>{children}</Text>
      </VStack>
    </Center>
  );
};
