'use client';

import {
  Box,
  Button,
  EmptyState,
  Group,
  Heading,
  Input,
  Stack,
  Table,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';
import { useTournaments } from '../hooks/useTournaments';
import Link from 'next/link';

export const TournamentsPage = () => {
  const router = useRouter();

  const { tournaments } = useTournaments();

  const [tournamentId, setTournamentId] = useState<string | null>(null);
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();

    if (!tournamentId) return;

    goToTournament(tournamentId);
  };

  const goToTournament = (tournamentId: string) => {
    router.push(`/tournaments/${tournamentId}`);
  };

  return (
    <Stack gap="6">
      <div>
        <Heading size="lg" color="text.primary" mb="4">
          Torneios
        </Heading>
        <form onSubmit={handleSearch}>
          <Group attached w="full" maxW="sm">
            <Input
              placeholder="ID do torneio"
              name="tournamentId"
              value={tournamentId || ''}
              onChange={(e) => setTournamentId(e.target.value)}
            />
            <Button type="submit" colorScheme="primary">
              Procurar
            </Button>
          </Group>
        </form>
      </div>

      {tournaments.length > 0 ? (
        <Table.Root size="md" interactive>
          <Table.Header bg="#0052CC">
            <Table.Row>
              <Table.ColumnHeader color="white" fontWeight="600">
                Torneios
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tournaments.map(({ id, name }, index) => (
              <Table.Row
                key={id}
                bg={index % 2 === 0 ? 'bg.secondary' : 'bg.primary'}
                _hover={{ bg: 'primary.50' }}
              >
                <Table.Cell p="0">
                  <Link href={`/tournaments/${id}`}>
                    <Box p="3" fontWeight="500">
                      {name}
                    </Box>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <EmptyState.Root>
          <EmptyState.Content>
            <VStack textAlign="center">
              <EmptyState.Title>Nenhum torneio salvo</EmptyState.Title>
              <EmptyState.Description>
                Procure um torneio pelo seu id, e ele aparecerá nesta lista no
                futuro.
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
    </Stack>
  );
};
