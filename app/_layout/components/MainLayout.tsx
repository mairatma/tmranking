'use client';

import { Box, Container, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { NavLink } from './NavLink';

interface Props {
  children: ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <Flex as="nav" bgColor="gray.100" alignItems="center" p="2" gap="4">
        <Image src="/images/logo.png" alt="CBTM" height={25} width={25} />
        <Flex fontWeight="bold" gap="4">
          <NavLink href="/" isActive={!pathname.includes('/tournaments')}>
            Ranking
          </NavLink>
          <NavLink
            href="/tournaments"
            isActive={pathname.includes('/tournaments')}
          >
            Torneios
          </NavLink>
        </Flex>
      </Flex>
      <Container>
        <Box py="4">{children}</Box>
      </Container>
    </>
  );
};
