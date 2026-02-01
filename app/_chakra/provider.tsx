'use client';

import { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';

interface Props {
  children: ReactNode;
}

export function Provider({ children }: Props) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
