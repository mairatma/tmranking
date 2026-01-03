'use client';

import { Box, Container, Table } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  return (
    <Container>
      <Box py="4">{children}</Box>
    </Container>
  );
};
