import { Box, Spinner, Table, Text } from '@chakra-ui/react';

import { useTournamentRegistrations } from '@/app/_ranking/hooks/useTournamentRegistrations';

interface Props {
  id: string;
  categoryId: string;
}

export const Registrations = ({ id, categoryId }: Props) => {
  const { data } = useTournamentRegistrations(id, categoryId);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Table.Root size="sm" interactive mt="4">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Nome</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Pts. Ranking</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Pts. Rating</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.registrations.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Box>
                <Text fontWeight="bold">{item.name}</Text>
                <Text textStyle="xs" color="fg.muted" fontWeight="normal">
                  {item.team}
                </Text>
              </Box>
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
  );
};
