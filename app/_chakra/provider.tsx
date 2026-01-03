'use client';

import { ReactNode } from 'react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

export function Provider({ children }: Props) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
