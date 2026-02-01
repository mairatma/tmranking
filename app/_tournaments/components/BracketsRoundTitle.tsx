import { Box } from '@chakra-ui/react';

interface Props {
  title: string;
}

export const BracketRoundTitle = ({ title }: Props) => {
  return (
    <Box color="brand.primary" fontWeight="bold" textAlign="center">
      {title}
    </Box>
  );
};
