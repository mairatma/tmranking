import { useState } from 'react';

import { Box, Spinner, Switch } from '@chakra-ui/react';

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
      <Switch.Root
        checked={shouldGroupByClubs}
        onCheckedChange={(e) => setShouldGroupByClubs(e.checked)}
      >
        <Switch.HiddenInput />
        <Switch.Label>Agrupar por clubes</Switch.Label>
        <Switch.Control />
      </Switch.Root>

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
