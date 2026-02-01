import { Box } from '@chakra-ui/react';

interface Props {
  title: string;
}

export const BracketRoundTitle = ({ title }: Props) => {
  return (
    <Box color="text.primary" fontWeight="medium" textAlign="center">
      {title}
    </Box>
  );
};
