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
      <Flex
        as="nav"
        bgColor="#0052CC"
        color="white"
        alignItems="center"
        px="6"
        py="4"
        gap="6"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
      >
        <Image src="/images/logo.png" alt="CBTM" height={32} width={32} />
        <Flex gap="8" ml="2">
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
        <Box py="6">{children}</Box>
      </Container>
    </>
  );
};
