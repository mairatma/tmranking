import {
  Badge,
  Card,
  Flex,
  Grid,
  Spinner,
  Table,
  Text,
} from '@chakra-ui/react';

import { useTournamentResults } from '../hooks/useTournamentResults';

interface Props {
  id: string;
  categoryId: string;
}

export const Results = ({ id, categoryId }: Props) => {
  const { data } = useTournamentResults(id, categoryId);

  if (!data) {
    return <Spinner />;
  }

  return (
    <Grid templateColumns="repeat(auto-fit, minmax(350px, 1fr))" gap="2">
      {data.results.map(
        ({ name, gameNumber, tableNumber, scores, finalScore, date, time }) => {
          return (
            <Card.Root key={gameNumber} flex="1">
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Description>
                  <Flex justifyContent="space-between" gap="1">
                    Jogo {gameNumber} - Mesa {tableNumber}
                    <Flex gap="1">
                      <Badge>{date}</Badge>
                      <Badge>{time}</Badge>
                    </Flex>
                  </Flex>
                </Card.Description>
                <Table.Root size="sm" interactive mt="4">
                  <Table.Body>
                    {scores.map((score, index) => {
                      return (
                        <Table.Row key={index}>
                          <Table.Cell>
                            <Text fontWeight="bold">{score.name}</Text>
                          </Table.Cell>
                          <Table.Cell textAlign="end">
                            <Text fontWeight="bold" color="teal.500">
                              {finalScore[index]}
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
              </Card.Body>
            </Card.Root>
          );
        },
      )}
    </Grid>
  );
};
