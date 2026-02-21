'use client';

import { Box, Stat } from '@chakra-ui/react';
import { format } from 'date-fns';
import type { TooltipContentProps } from 'recharts';

export const ChartTooltip = (
  props: Partial<TooltipContentProps<string, string>>,
) => {
  const { active, payload, label } = props;
  if (!active || !payload || payload.length === 0 || !label) return null;

  console.log('ChartTooltip', payload, label);

  const value = payload[0].value;

  return (
    <Box w="40" rounded="sm" bg="primary.50" p="3">
      <Stat.Root size="sm">
        <Stat.Label>{format(label, 'dd/MM/yyyy')}</Stat.Label>
        <Stat.ValueText alignItems="baseline">
          {value}
          <Stat.ValueUnit>pontos</Stat.ValueUnit>
        </Stat.ValueText>
      </Stat.Root>
    </Box>
  );
};
