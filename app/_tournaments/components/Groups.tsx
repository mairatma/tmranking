import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';

import { useTournamentGroups } from '../hooks/useTournamentGroups';

interface Props {
  id: string;
  categoryId: string;
}

export const Groups = ({ id, categoryId }: Props) => {
  const { data } = useTournamentGroups(id, categoryId);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap="2">
      {data.groups.map(({ name, participants }, groupIndex) => {
        return (
          <Card.Root key={name} flex="1">
            <Card.Body>
              <Card.Title>Grupo {groupIndex + 1}</Card.Title>
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
                        <Text fontWeight="bold" color="teal.500">
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
  );
};
