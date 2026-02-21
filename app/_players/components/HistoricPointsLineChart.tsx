import { EmptyState, VStack } from '@chakra-ui/react';

import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { useHistoricPointsData } from '../hooks/useHistoricPointsData';
import { ErrorAlert } from '@/app/_components/base/ErrorAlert';

import { DateLineChart } from '@/app/_components/chart/DateLineChart';

interface Props {
  playerId: string;
  categoryId: string;
  year?: number;
}

export const HistoricPointsLineChart = ({
  playerId,
  categoryId,
  year,
}: Props) => {
  const { data, isLoading, isError } = useHistoricPointsData(
    playerId,
    categoryId,
    year,
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorAlert />;
  }

  if (data.length === 0) {
    return (
      <EmptyState.Root size="sm" borderWidth="1px" p="4" rounded="md">
        <EmptyState.Content>
          <VStack textAlign="center">
            <EmptyState.Title>Nenhum evento encontrado</EmptyState.Title>
            <EmptyState.Description>
              Não foram encontrados eventos para plotar o gráfico.
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  return <DateLineChart data={data} mt="3" />;
};
