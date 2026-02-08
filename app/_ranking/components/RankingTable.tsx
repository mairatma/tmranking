'use client';

import { Box, EmptyState, Flex, Table, Text, VStack } from '@chakra-ui/react';

import { RankingEntry } from '../types';
import Link from 'next/link';

interface Props {
  category: string;
  rankings: RankingEntry[];
}

export const RankingTable = ({ category, rankings }: Props) => {
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
          return (
            <Table.Row key={item.rank}>
              <Table.Cell p="0">
                <Link
                  href={`https://app.cbtm.org.br/iUI/Site/RankingResultadoDetalhe?Categoria=${category}&Ano=2026&Associado=${item.id}&Tipo=O&UF=BR&Colocacao=${item.rank}&Pontos=${item.points}`}
                  target="_blank"
                >
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
                <Link
                  href={`https://app.cbtm.org.br/iUI/Site/RankingResultadoDetalhe?Categoria=${category}&Ano=2026&Associado=${item.id}&Tipo=O&UF=BR&Colocacao=${item.rank}&Pontos=${item.points}`}
                  target="_blank"
                >
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
