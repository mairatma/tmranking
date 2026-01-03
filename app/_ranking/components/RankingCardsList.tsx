'use client';

import { Card, Heading, Text } from '@chakra-ui/react';

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
            <Heading size="lg">
              {' '}
              <Text display="inline" color="teal.500">
                {item.rank}
              </Text>{' '}
              - {item.name}
            </Heading>
          </Card.Header>
          <Card.Body>
            <Text textStyle="md" fontWeight="medium" mb="2">
              Pontos: {item.points}
            </Text>
            <Text color="fg.muted">
              {item.club} - {item.state}
            </Text>
          </Card.Body>
        </Card.Root>
      ))}
    </>
  );
};
