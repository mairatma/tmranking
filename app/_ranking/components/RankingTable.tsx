'use client';

import { Box, EmptyState, Flex, Table, Text, VStack } from '@chakra-ui/react';

import { Link } from '@/app/_components/base/Link';

import { RankingEntry } from '../types';
import { CATEGORY_ID_MAP, CategoryType } from '../categories';

interface Props {
  category: string;
  rankings: RankingEntry[];
  year: number;
}

export const RankingTable = ({ category, rankings, year }: Props) => {
  if (rankings.length == 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <VStack textAlign="center">
            <EmptyState.Title>Nenhum atleta encontrado</EmptyState.Title>
            <EmptyState.Description>
              Não há atletas para os filtros selectionados.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  const isPlayerPageSupported =
    CATEGORY_ID_MAP[category].type !== CategoryType.Rating;

  return (
    <Table.Root size="sm" interactive striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Nome</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Pontos</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rankings.map((item) => {
          const description = `${item.club}${item.club && item.state ? ' - ' : ''}${item.state}`;

          const playerLink = isPlayerPageSupported
            ? `/players/${item.id}/category/${category}?year=${year}`
            : `https://app.cbtm.org.br/iUI/Site/RatingResultadoDetalhe?Rating=${category}&Associado=${item.id}&Colocacao=${item.rank}&Pontos=${item.points}`;
          const linkTarget = isPlayerPageSupported ? undefined : '_blank';

          return (
            <Table.Row key={item.id}>
              <Table.Cell p="0">
                <Link href={playerLink} target={linkTarget}>
                  <Flex gap="2" p="3" alignItems="flex-start">
                    <Text fontWeight="bold" color="brand.primary" minW="3rem">
                      #{item.rank}
                    </Text>{' '}
                    <Box flex="1">
                      <Text fontWeight="600" color="text.primary">
                        {item.name}
                      </Text>
                      <Text textStyle="xs" color="text.muted" fontWeight="400">
                        {description || '-'}
                      </Text>
                    </Box>
                  </Flex>
                </Link>
              </Table.Cell>
              <Table.Cell textAlign="end" p="0">
                <Link href={playerLink} target={linkTarget}>
                  <Box p="3" fontWeight="600" color="text.primary">
                    {item.points}
                  </Box>
                </Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};
