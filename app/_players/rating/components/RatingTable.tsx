import { Box, EmptyState, Flex, Table, Text, VStack } from '@chakra-ui/react';
import { format, parse } from 'date-fns';

import { GameScore, RatingScore } from '../types';
import { LuArrowDown, LuArrowUp } from 'react-icons/lu';
import { ScorePopover } from '@/app/_components/ScorePopover';
import { ScoreResults } from '@/app/_tournaments/types';

interface Props {
  scores: RatingScore[];
  playerName: string;
}

const hasOpponentName = (score: RatingScore): score is GameScore => {
  return 'opponentName' in score;
};

export const RatingTable = ({ scores, playerName }: Props) => {
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
          <Table.ColumnHeader textAlign="end">Rating</Table.ColumnHeader>
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

          const results: ScoreResults | null = hasOpponentName(item)
            ? [
                {
                  playerName,
                  totalScore: item.scores.totalScores[0],
                  sets: item.scores.playerSets,
                },
                {
                  playerName: item.opponentName,
                  totalScore: item.scores.totalScores[1],
                  sets: item.scores.opponentSets,
                },
              ]
            : null;

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
                <ScorePopover results={results}>
                  <Flex
                    fontWeight="600"
                    color="text.primary"
                    gap="2"
                    justifyContent="end"
                  >
                    <Text fontSize="xs" fontWeight="600" color={scoreColor}>
                      <Flex alignItems="center">
                        {item.points > 0 ? '+' : ''}
                        {item.points}
                        {item.points > 0 ? (
                          <LuArrowUp />
                        ) : item.points < 0 ? (
                          <LuArrowDown />
                        ) : (
                          ''
                        )}
                      </Flex>
                    </Text>
                    {item.scoreAfter}
                  </Flex>
                </ScorePopover>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
