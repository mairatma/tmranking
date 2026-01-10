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

const HOVER_COLOR = 'teal.500';
const ACTIVE_COLOR = 'teal.600';
const INACTIVE_COLOR = 'teal.800';

export const NavLink = ({ children, href, isActive, ...otherProps }: Props) => {
  return (
    <ChakraLink
      asChild
      color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
      _hover={{ textDecoration: 'none', color: HOVER_COLOR }}
      {...otherProps}
    >
      <Link href={href}>{children}</Link>
    </ChakraLink>
  );
};
