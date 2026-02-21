import { getCurrentYear } from '@/app/_ranking/helpers/years';
import { usePlayerRankingInfo } from './usePlayerRankingInfo';
import { EventResult } from '../types';
import { addYears, compareAsc, compareDesc, parse, subYears } from 'date-fns';
import { DateChartEntry } from '@/app/_components/chart/DateLineChart';

const CURRENT_YEAR = getCurrentYear();

const isDateInChartRange = (date: Date, minChartDate: Date) => {
  return date >= minChartDate;
};

const buildPointsDelta = (events: EventResult[], year: number) => {
  const currentDate =
    year === CURRENT_YEAR ? new Date() : new Date(year, 12, 31, 11, 59, 59);

  const minChartDate = subYears(currentDate, 1);

  const dateToEntryMap = new Map<number, DateChartEntry>();

  events.forEach((event) => {
    const date = parse(event.date, 'dd/MM/yyyy', currentDate);
    const expirationDate = addYears(date, 1);

    const isExpired = expirationDate <= currentDate;
    if (isExpired && isDateInChartRange(expirationDate, minChartDate)) {
      dateToEntryMap.set(expirationDate.getTime(), {
        date: expirationDate,
        value: -1 * event.score,
      });
    }

    if (!isExpired && isDateInChartRange(date, minChartDate)) {
      dateToEntryMap.set(date.getTime(), {
        date: date,
        value: event.score,
      });
    }
  });

  const unorderedData = dateToEntryMap.values().toArray();
  const data = [...unorderedData].sort((a, b) => compareDesc(a.date, b.date));
  return data;
};

const buildChartDataFromScoredEvents = (
  yearEvents: EventResult[],
  oneYearOlderEvents: EventResult[],
  twoYearOlderEvents: EventResult[],
  year: number,
) => {
  const pointsDelta = buildPointsDelta(
    [...yearEvents, ...oneYearOlderEvents, ...twoYearOlderEvents],

    year,
  );

  const finalScore = yearEvents.reduce((acc, { score }) => acc + score, 0);

  let currentScore = finalScore;
  const unorderedData = pointsDelta.map(({ date, value }, index) => {
    if (index === 0) {
      currentScore -= value;
      return { date, value: finalScore };
    }

    const entry = { date, value: currentScore };
    currentScore -= value;
    return entry;
  });

  const data = [...unorderedData].sort((a, b) => compareAsc(a.date, b.date));
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
    currentData?.player.scoredEvents ?? [],
    lastYearData?.player.scoredEvents ?? [],
    yearBeforeLastData?.player.scoredEvents ?? [],
    year,
  );
  return { data, isLoading: false, isError: false };
};
