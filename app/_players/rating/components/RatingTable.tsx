import { Box, EmptyState, Table, VStack } from '@chakra-ui/react';
import { format, parse } from 'date-fns';

import { GameScore, RatingScore } from '../types';

interface Props {
  scores: RatingScore[];
}

const hasOpponentName = (score: RatingScore): score is GameScore => {
  return 'opponentName' in score;
};

export const RatingTable = ({ scores }: Props) => {
  if (scores.length === 0) {
    return (
      <EmptyState.Root size="sm" borderWidth="1px" p="4" rounded="md">
        <EmptyState.Content>
          <VStack textAlign="center">
            <EmptyState.Title>
              Nenhum evento pontuado encontrado
            </EmptyState.Title>
            <EmptyState.Description>
              Não foram encontrados eventos que pontuaram para o rating.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  return (
    <Table.Root size="sm" interactive striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Data</Table.ColumnHeader>
          <Table.ColumnHeader>Evento</Table.ColumnHeader>
          {hasOpponentName(scores[0]) && (
            <Table.ColumnHeader>Oponente</Table.ColumnHeader>
          )}
          <Table.ColumnHeader textAlign="end">Pontos</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Rating depois</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {scores.map((item, index) => {
          const scoreColor =
            item.points > 0
              ? 'secondary.900'
              : item.points < 0
                ? 'accent.900'
                : 'fg.subtle';

          const splitDate = item.date.split(' ')[0];
          const parsedDate = parse(splitDate, 'dd/MM/yyyy', new Date());

          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Box fontWeight="600" color="text.primary">
                  {format(parsedDate, 'dd/MM/yyyy')}
                </Box>
              </Table.Cell>
              <Table.Cell>
                <Box fontWeight="600" color="text.primary">
                  {item.eventName}
                </Box>
              </Table.Cell>
              {hasOpponentName(item) && (
                <Table.Cell>
                  <Box fontWeight="600" color="text.primary">
                    {item.opponentName}
                  </Box>
                </Table.Cell>
              )}
              <Table.Cell textAlign="end">
                <Box fontWeight="600" color={scoreColor}>
                  {item.points > 0 ? '+' : ''}
                  {item.points}
                </Box>
              </Table.Cell>
              <Table.Cell textAlign="end">
                <Box fontWeight="600" color="text.primary">
                  {item.scoreAfter}
                </Box>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
