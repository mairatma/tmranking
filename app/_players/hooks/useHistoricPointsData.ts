import { getCurrentYear } from '@/app/_ranking/helpers/years';
import { usePlayerRankingInfo } from './usePlayerRankingInfo';
import { EventResult } from '../types';
import { addYears, compareAsc, parse, subYears } from 'date-fns';
import { DateChartEntry } from '@/app/_components/chart/DateLineChart';

const CURRENT_YEAR = getCurrentYear();

const isDateInChartRange = (date: Date, minChartDate: Date) => {
  return date >= minChartDate;
};

const buildChartDataFromScoredEvents = (
  events: EventResult[],
  year: number,
) => {
  const currentDate =
    year === CURRENT_YEAR ? new Date() : new Date(year, 12, 31, 11, 59, 59);

  const minChartDate = subYears(currentDate, 1);

  const rawData = events.map((event) => {
    const date = parse(event.date, 'dd/MM/yyyy', currentDate);
    const expirationDate = addYears(date, 1);

    const isExpired = expirationDate <= currentDate;
    if (isExpired && isDateInChartRange(expirationDate, minChartDate)) {
      return { date: expirationDate, value: -1 * event.score };
    }

    if (!isExpired && isDateInChartRange(date, minChartDate)) {
      return { date: date, value: event.score };
    }

    return null;
  });

  const filteredData = rawData.filter((entry) => entry !== null);
  const data = [...filteredData].sort((a, b) => compareAsc(a.date, b.date));

  return data;
};

type ReturnValue =
  | { data: null; isLoading: true; isError: false }
  | { data: null; isLoading: false; isError: true }
  | { data: DateChartEntry[]; isLoading: false; isError: false };

export const useHistoricPointsData = (
  playerId: string,
  categoryId: string,
  year = CURRENT_YEAR,
): ReturnValue => {
  const {
    data: currentData,
    isLoading: isLoadingCurrentData,
    isError: isErrorCurrentData,
  } = usePlayerRankingInfo(playerId, categoryId, year);
  const {
    data: lastYearData,
    isLoading: isLoadingLastYearData,
    isError: isErrorLastYearData,
  } = usePlayerRankingInfo(playerId, categoryId, year - 1);
  const {
    data: yearBeforeLastData,
    isLoading: isLoadingYearBeforeLastData,
    isError: isErrorYearBeforeLastData,
  } = usePlayerRankingInfo(playerId, categoryId, year - 2);

  if (
    isLoadingCurrentData ||
    isLoadingLastYearData ||
    isLoadingYearBeforeLastData
  ) {
    return { data: null, isLoading: true, isError: false };
  }

  if (isErrorCurrentData || isErrorLastYearData || isErrorYearBeforeLastData) {
    return { data: null, isLoading: false, isError: true };
  }

  const data = buildChartDataFromScoredEvents(
    [
      ...(currentData?.player.scoredEvents ?? []),
      ...(lastYearData?.player.scoredEvents ?? []),
      ...(yearBeforeLastData?.player.scoredEvents ?? []),
    ],
    year,
  );
  return { data, isLoading: false, isError: false };
};
