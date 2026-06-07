'use client';

import {
  Box,
  Button,
  EmptyState,
  Flex,
  Group,
  Heading,
  Input,
  Stack,
  Table,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState, useEffect } from 'react';
import { useTournaments } from '../hooks/useTournaments';
import { useFavoriteTournaments } from '../hooks/useFavoriteTournaments';
import Link from 'next/link';
import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { ErrorAlert } from '@/app/_components/base/ErrorAlert';

export const TournamentsPage = () => {
  const router = useRouter();

  const [nameSearch, setNameSearch] = useState('');
  const [debouncedNameSearch, setDebouncedNameSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedNameSearch(nameSearch), 300);
    return () => clearTimeout(timeout);
  }, [nameSearch]);

  const {
    data: tournaments,
    isLoading,
    isError,
  } = useTournaments(debouncedNameSearch || undefined);
  const favoriteTournaments = useFavoriteTournaments();

  const [tournamentId, setTournamentId] = useState<string | null>(null);
  const handleSearch: FormEventHandler = (e) => {
    e.preventDefault();

    if (!tournamentId) return;

    goToTournament(tournamentId);
  };

  const goToTournament = (tournamentId: string) => {
    router.push(`/tournaments/${tournamentId}`);
  };

  if (isError) {
    return <ErrorAlert />;
  }

  return (
    <Stack gap="6">
      <div>
        <Heading size="lg" color="text.primary" mb="4">
          Torneios
        </Heading>
        <Flex gap="3" wrap="wrap">
          <Input
            placeholder="Buscar por nome"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            maxW="sm"
          />
          <form onSubmit={handleSearch}>
            <Group attached>
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
        </Flex>
      </div>

      {favoriteTournaments.length > 0 && (
        <Table.Root size="md" interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader color="white" fontWeight="600">
                Favoritos
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {favoriteTournaments.map(({ id, name }, index) => (
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
      )}

      {isLoading && <LoadingPage />}

      {tournaments && tournaments.length > 0 && (
        <Table.Root size="md" interactive>
          <Table.Body>
            {tournaments?.map(({ cbtmId, name }, index) => (
              <Table.Row
                key={cbtmId}
                bg={index % 2 === 0 ? 'bg.secondary' : 'bg.primary'}
                _hover={{ bg: 'primary.50' }}
              >
                <Table.Cell p="0">
                  <Link href={`/tournaments/${cbtmId}`}>
                    <Box p="3" fontWeight="500">
                      {name}
                    </Box>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
      {!isLoading && tournaments?.length === 0 && (
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
