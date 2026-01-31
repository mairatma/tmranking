import {
  Badge,
  Box,
  Flex,
  Spinner,
  Switch,
  Table,
  Text,
} from '@chakra-ui/react';

import {
  RegistrationType,
  useTournamentRegistrations,
} from '@/app/_tournaments/hooks/useTournamentRegistrations';
import { useState } from 'react';

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

  const itemsToDisplay = data.registrations;
  if (shouldGroupByClubs) {
    itemsToDisplay.sort((reg1, reg2) => {
      if (reg1.team < reg2.team) return -1;
      if (reg1.team > reg2.team) return 1;
      return 0;
    });
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
      <Table.Root size="sm" interactive mt="4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nome</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">
              Pts. Ranking
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Pts. Rating</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {itemsToDisplay.map((item, index) => (
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
    </Box>
  );
};
