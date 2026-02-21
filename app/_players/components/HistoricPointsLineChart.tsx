import { LoadingPage } from '@/app/_components/base/LoadingPage';
import { useHistoricPointsData } from '../hooks/useHistoricPointsData';
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
    // TODO: Improve error handling.
    return 'Error!';
  }

  return <DateLineChart data={data} />;
};
