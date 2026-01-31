import { Box, Card, Stack } from '@chakra-ui/react';
import { TournamentRegistration } from '../types';
import { RegistrationsTable } from './RegistrationsTable';

interface Props {
  registrations: TournamentRegistration[];
}

export const GroupedRegistrations = ({ registrations }: Props) => {
  const groups = new Map<string, TournamentRegistration[]>();
  registrations.forEach((registration) => {
    const team = registration.team ?? 'Unknown';
    const previousGroup = groups.get(team) ?? [];
    groups.set(team, [...previousGroup, registration]);
  });

  return (
    <Stack gap="4">
      {groups.entries().map(([team, registrations]) => (
        <Card.Root key={team} flex="1">
          <Card.Body>
            <Card.Title>{team}</Card.Title>
            <Box mt="4">
              <RegistrationsTable registrations={registrations} />
            </Box>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};
