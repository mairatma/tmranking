import { useState } from 'react';

import {
  Badge,
  Box,
  Card,
  EmptyState,
  Flex,
  Grid,
  Spinner,
  Table,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useTournamentGroups } from '../hooks/useTournamentGroups';
import {
  enhanceGroupsWithNumber,
  filterGroupsByAthelete,
  getAllAtheletesFromGroups,
} from '../helpers/groups';
import { SearchSelect } from '@/app/_components/SearchSelect';

interface Props {
  id: string;
  categoryId: string;
}

export const Groups = ({ id, categoryId }: Props) => {
  const { data } = useTournamentGroups(id, categoryId);

  const [selectedAthelete, setSelectedAthlete] = useState('');

  if (!data) {
    return <Spinner />;
  }

  if (data.groups.length === 0) {
    return (
      <EmptyState.Root size="sm" borderWidth="1px" p="4" rounded="md">
        <EmptyState.Content>
          <VStack textAlign="center">
            <EmptyState.Title>Nenhum grupos encontrado</EmptyState.Title>
            <EmptyState.Description>
              Não foram encontrados grupos. O torneio ainda está sendo
              preparado.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  const groupsWithNumber = enhanceGroupsWithNumber(data.groups);

  const atheleteOptions = getAllAtheletesFromGroups(data.groups).map(
    (name) => ({ label: name, value: name }),
  );
  const groupsToDisplay = selectedAthelete
    ? filterGroupsByAthelete(groupsWithNumber, selectedAthelete)
    : groupsWithNumber;

  return (
    <Box>
      <SearchSelect
        label="Filtrar por atleta"
        options={atheleteOptions}
        value={selectedAthelete}
        onChange={setSelectedAthlete}
        mb="4"
      />
      <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap="2">
        {groupsToDisplay.map(({ name, participants, number }) => {
          return (
            <Card.Root key={name} flex="1">
              <Card.Body>
                <Card.Title>Grupo {number}</Card.Title>
                <Table.Root size="sm" interactive mt="4">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>#</Table.ColumnHeader>
                      <Table.ColumnHeader>Nome</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Pts. Ranking
                      </Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Pts. Rating
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {participants.map((item, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Text fontWeight="bold" color="primary.500">
                            {index + 1}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Flex justifyContent="space-between" gap="2">
                            <Text fontWeight="bold">{item.name}</Text>
                            {item.qualified && (
                              <Badge colorPalette="green" height="fit-content">
                                <Text>Classificado</Text>
                              </Badge>
                            )}
                          </Flex>
                        </Table.Cell>
                        <Table.Cell textAlign="end">
                          <Box p="2">{item.rankingPoints}</Box>
                        </Table.Cell>
                        <Table.Cell textAlign="end">
                          <Box p="2">{item.ratingPoints}</Box>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Card.Body>
            </Card.Root>
          );
        })}
      </Grid>
    </Box>
  );
};
