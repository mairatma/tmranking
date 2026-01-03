'use client';

import { Card, Heading, Stat, Text } from '@chakra-ui/react';

import { RankingEntry } from '../types';

interface Props {
  rankings: RankingEntry[];
}

export const RankingCardsList = ({ rankings }: Props) => {
  return (
    <>
      {rankings.map((item) => (
        <Card.Root key={item.rank} hideFrom="sm" mt="4">
          <Card.Header>
            <Heading size="xl">
              {' '}
              <Text display="inline" color="teal.500">
                #{item.rank}
              </Text>{' '}
              {item.name}
            </Heading>
          </Card.Header>
          <Card.Body>
            <Stat.Root>
              <Stat.Label>Pontos </Stat.Label>
              <Stat.ValueText>
                {new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(
                  item.points,
                )}
              </Stat.ValueText>
              <Stat.HelpText>
                {item.club} - {item.state}
              </Stat.HelpText>
            </Stat.Root>
          </Card.Body>
        </Card.Root>
      ))}
    </>
  );
};
