'use client';

import {
  Box,
  Button,
  Card,
  EmptyState,
  Flex,
  Grid,
  GridItem,
  Group,
  Heading,
  Input,
  InputGroup,
  Popover,
  Stack,
  Table,
  VStack,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
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
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="lg" color="text.primary">
          Torneios
        </Heading>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="outline" colorPalette="primary">
              Procurar por ID
            </Button>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content width="auto">
              <Popover.Arrow />
              <Popover.Body>
                <form onSubmit={handleSearch}>
                  <Group attached>
                    <Input
                      placeholder="ID do torneio"
                      name="tournamentId"
                      value={tournamentId || ''}
                      onChange={(e) => setTournamentId(e.target.value)}
                    />
                    <Button type="submit" colorPalette="primary">
                      Ir
                    </Button>
                  </Group>
                </form>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      </Flex>

      <Grid
        templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        gap="6"
        alignItems="start"
      >
        {favoriteTournaments.length > 0 && (
          <GridItem
            gridColumn={{ base: '1', lg: '2' }}
            gridRow={{ base: '1', lg: '1' }}
          >
            <Card.Root overflow="hidden" size="sm">
              <Card.Header bg="primary.900" pb="3">
                <Heading size="md" color="white">
                  Favoritos
                </Heading>
              </Card.Header>
              <Card.Body p="0">
                <Table.Root size="md" interactive>
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
              </Card.Body>
            </Card.Root>
          </GridItem>
        )}

        <GridItem
          gridColumn={{ base: '1', lg: '1' }}
          gridRow={{
            base: favoriteTournaments.length > 0 ? '2' : '1',
            lg: '1',
          }}
        >
          <Stack gap="4">
            <InputGroup w="full" endElement={<LuSearch />}>
              <Input
                placeholder="Buscar por nome"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </InputGroup>

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
                      Procure um torneio pelo seu id, e ele aparecerá nesta
                      lista no futuro.
                    </EmptyState.Description>
                  </VStack>
                </EmptyState.Content>
              </EmptyState.Root>
            )}
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
};
