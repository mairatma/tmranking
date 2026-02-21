import { Alert } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export const ErrorAlert = ({ children }: Props) => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Title>
        {children ??
          ' Um erro inesperado ocorreu. Recarregue a página ou tente mais tarde'}
      </Alert.Title>
    </Alert.Root>
  );
};
