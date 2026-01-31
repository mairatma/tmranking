import { Badge, Box, Flex, Table, Text } from '@chakra-ui/react';

import { RegistrationType, TournamentRegistration } from '../types';

interface Props {
  registrations: TournamentRegistration[];
}

export const RegistrationsTable = ({ registrations }: Props) => {
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
        {registrations.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Box>
                <Flex alignItems="center" gap="2">
                  <Text fontWeight="bold">{item.name}</Text>
                  <Badge
                    size="xs"
                    colorPalette={
                      item.registrationType === RegistrationType.REGISTERED
                        ? 'green'
                        : undefined
                    }
                  >
                    {item.registrationType}
                  </Badge>
                </Flex>
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
