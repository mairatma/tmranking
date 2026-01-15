import { Box } from '@chakra-ui/react';

interface Props {
  title: string;
}

export const BracketRoundTitle = ({ title }: Props) => {
  return (
    <Box color="teal.fg" fontWeight="bold" textAlign="center">
      {title}
    </Box>
  );
};
