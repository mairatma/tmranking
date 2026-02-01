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
        bgColor="white"
        alignItems="center"
        px="6"
        py="3"
        gap="4"
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
      >
        <Image src="/images/cbtm.png" alt="CBTM" height={32} width={32} />
        <Flex gap="6" ml="2">
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
