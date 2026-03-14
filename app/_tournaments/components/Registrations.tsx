import { useState } from 'react';

import { Box, Flex, Spinner, Switch, Text } from '@chakra-ui/react';

import { useTournamentRegistrations } from '@/app/_tournaments/hooks/useTournamentRegistrations';

import { RegistrationsTable } from '../registrations/components/RegistrationsTable';
import { GroupedRegistrations } from '../registrations/components/GroupedRegistrations';

interface Props {
  id: string;
  categoryId: string;
}

export const Registrations = ({ id, categoryId }: Props) => {
  const [shouldGroupByClubs, setShouldGroupByClubs] = useState(false);
  const { data } = useTournamentRegistrations(id, categoryId);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Box>
      <Flex gap="3" justifyContent={{ smDown: 'space-between' }}>
        <Text display="flex" gap="2" fontSize="sm" color="fg.muted">
          <Text fontWeight="bold">Total de inscritos:</Text>
          <Text>{data.registrations.length}</Text>
        </Text>

        <Switch.Root
          checked={shouldGroupByClubs}
          onCheckedChange={(e) => setShouldGroupByClubs(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Label fontSize="sm" color="fg.muted" fontWeight="bold">
            Agrupar por clubes:
          </Switch.Label>
          <Switch.Control />
        </Switch.Root>
      </Flex>

      <Box mt="4">
        {shouldGroupByClubs ? (
          <GroupedRegistrations registrations={data.registrations} />
        ) : (
          <RegistrationsTable registrations={data.registrations} />
        )}
      </Box>
    </Box>
  );
};
