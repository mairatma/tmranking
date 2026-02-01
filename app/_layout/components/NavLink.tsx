'use client';

import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';

interface Props extends Omit<ChakraLinkProps, 'href'> {
  isActive?: boolean;
  href: LinkProps['href'];
}

export const NavLink = ({ children, href, isActive, ...otherProps }: Props) => {
  return (
    <ChakraLink
      asChild
      fontWeight="500"
      fontSize="md"
      color="white"
      position="relative"
      transition="color 0.2s"
      opacity={isActive ? 1 : 0.8}
      _hover={{
        textDecoration: 'none',
        opacity: 1,
        _after: {
          width: '100%',
        },
      }}
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        width: isActive ? '100%' : '0',
        height: '2px',
        backgroundColor: 'white',
        transition: 'width 0.2s ease',
      }}
      {...otherProps}
    >
      <Link href={href}>{children}</Link>
    </ChakraLink>
  );
};
