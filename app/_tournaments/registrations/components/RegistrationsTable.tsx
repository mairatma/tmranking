import { Badge, Box, Table, Text } from '@chakra-ui/react';

import { TournamentRegistration } from '../types';

interface Props {
  registrations: TournamentRegistration[];
}

export const RegistrationsTable = ({ registrations }: Props) => {
  return (
    <Table.Root size="sm" interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader color="white" fontWeight="600">
            Nome
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end" color="white" fontWeight="600">
            Pts. Ranking
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end" color="white" fontWeight="600">
            Pts. Rating
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {registrations.map((item, index) => (
          <Table.Row
            key={index}
            bg={index % 2 === 0 ? 'bg.secondary' : 'bg.primary'}
            _hover={{ bg: 'primary.50' }}
          >
            <Table.Cell p="3">
              <Box>
                <Text fontWeight="600" color="text.primary">
                  {item.name}
                </Text>
                <Text textStyle="xs" color="text.muted" fontWeight="400">
                  {item.team}
                </Text>
                <Badge size="xs">{item.registrationType}</Badge>
              </Box>
            </Table.Cell>
            <Table.Cell textAlign="end" p="3">
              <Box fontWeight="600" color="text.primary">
                {item.rankingPoints}
              </Box>
            </Table.Cell>
            <Table.Cell textAlign="end" p="3">
              <Box fontWeight="600" color="text.primary">
                {item.ratingPoints}
              </Box>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
