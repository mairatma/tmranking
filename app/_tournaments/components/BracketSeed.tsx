import {
  Box,
  Center,
  Popover,
  Portal,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';
import { IRenderSeedProps, Seed, SeedItem, SeedTeam } from 'react-brackets';
import { TBD_WINNER } from '../helpers/brackets';
import { TournamentResults } from '../types';

const WINNER_STYLES = {
  color: 'var(--chakra-colors-primary-900)',
  fontWeight: 'bold',
};
const LOSER_STYLES = {
  color: 'var(--chakra-colors-primary-700)',
};

interface Props extends IRenderSeedProps {
  results?: TournamentResults[];
}

export const BracketSeed = ({
  seed,
  breakpoint,
  rounds,
  roundIndex,
  results,
}: Props) => {
  const { score, teams, date, winner } = seed;
  const currentRoundTitle = rounds?.[roundIndex]?.title;

  const gameResults = results?.find(({ name, scores }) => {
    if (name.toLowerCase() !== currentRoundTitle?.toLowerCase()) return false;

    if (scores[0].name === teams[0].name && scores[1].name === teams[1].name)
      return true;
    return false;
  });

  const isFirstTeamTheWinner =
    winner === teams[0].name && winner !== TBD_WINNER;
  const isSecondTeamTheWinner =
    winner === teams[1].name && winner !== TBD_WINNER;

  return (
    <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <Popover.Root
        positioning={{
          offset: { crossAxis: 0, mainAxis: -20 },
          placement: 'bottom-start',
        }}
      >
        <Popover.Trigger asChild>
          <Box cursor="pointer" _hover={{ opacity: 0.8 }} width="100%">
            <SeedItem
              style={{ backgroundColor: 'var(--chakra-colors-primary-100)' }}
            >
              <div>
                <SeedTeam
                  style={isFirstTeamTheWinner ? WINNER_STYLES : LOSER_STYLES}
                >
                  {teams[0]?.name || 'BYE'}
                  <div>{score[0]}</div>
                </SeedTeam>
                <SeedTeam
                  style={isSecondTeamTheWinner ? WINNER_STYLES : LOSER_STYLES}
                >
                  {teams[1]?.name || 'BYE'}
                  <div>{score[1]}</div>
                </SeedTeam>
              </div>
            </SeedItem>
            <Box color="gray.500" mt={1}>
              {date}
            </Box>
          </Box>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width={gameResults ? 'auto' : undefined}>
              <Popover.Arrow />
              <Popover.Body>
                {!results && (
                  <Center>
                    <Spinner size="md" color="primary.900" />
                  </Center>
                )}
                {!gameResults && <Box>Sem detalhes.</Box>}
                {gameResults && (
                  <Table.Root size="sm">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>Detalhes</Table.ColumnHeader>
                        <Table.ColumnHeader
                          colSpan={gameResults!.scores[0].sets.length + 2}
                        ></Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {gameResults.scores.map((score, index) => {
                        return (
                          <Table.Row key={index}>
                            <Table.Cell>
                              <Text fontWeight="bold">{score.name}</Text>
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                              <Text fontWeight="bold" color="primary.500">
                                {gameResults.finalScore[index]}
                              </Text>
                            </Table.Cell>
                            {score.sets.map((setScore, setScoreIndex) => (
                              <Table.Cell key={setScoreIndex} textAlign="end">
                                {setScore}
                              </Table.Cell>
                            ))}
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table.Root>
                )}
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Seed>
  );
};
