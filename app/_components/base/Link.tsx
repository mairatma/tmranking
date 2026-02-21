import NextLink from 'next/link';

type Props = Parameters<typeof NextLink>[0];

export const Link = (props: Props) => {
  return <NextLink prefetch={false} {...props} />;
};
