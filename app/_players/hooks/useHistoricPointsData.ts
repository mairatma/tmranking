import { getCurrentYear } from '@/app/_ranking/helpers/years';
import { usePlayerRankingInfo } from './usePlayerRankingInfo';
import { EventResult } from '../types';
import { addMonths, addYears, endOfMonth, parse, subYears } from 'date-fns';
import { DateChartEntry } from '@/app/_components/chart/DateLineChart';

const CURRENT_YEAR = getCurrentYear();

const MAX_SCORED_EVENTS = 8;

const getScoreAtDate = (date: Date, events: EventResult[]) => {
  const validEventsAtDate = events.filter((event) => {
    const eventDate = parse(event.date, 'dd/MM/yyyy', new Date());
    const hasEventHappened = eventDate <= date;
    if (!hasEventHappened) return false;

    const expirationDate = addYears(eventDate, 1);
    const hasEventExpired = expirationDate <= date;
    if (hasEventExpired) return false;

    return true;
  });

  validEventsAtDate.sort((a, b) => b.score - a.score);

  const scoredEventsAtDate = validEventsAtDate.slice(0, MAX_SCORED_EVENTS);

  return scoredEventsAtDate.reduce((acc, event) => acc + event.score, 0);
};

const buildChartDataFromEvents = (events: EventResult[], year: number) => {
  const maxChartDate =
    year === CURRENT_YEAR
      ? endOfMonth(new Date())
      : new Date(year, 12, 31, 11, 59, 59);
  const minChartDate = endOfMonth(subYears(maxChartDate, 1));

  const chartData: DateChartEntry[] = [];
  let currentDate = minChartDate;
  while (currentDate <= maxChartDate) {
    chartData.push({
      date: currentDate,
      value: getScoreAtDate(currentDate, events),
    });

    currentDate = endOfMonth(addMonths(currentDate, 1));
  }

  return chartData;
};

const buildUniqueEventsArray = (events: EventResult[]) => {
  const dateToEventMap = new Map<string, EventResult>();
  events.forEach((event) => {
    dateToEventMap.set(event.date, event);
  });
  return dateToEventMap.values().toArray();
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

  const allEvents = buildUniqueEventsArray([
    ...(currentData?.player.scoredEvents ?? []),
    ...(currentData?.player.unscoredEvents ?? []),
    ...(lastYearData?.player.scoredEvents ?? []),
    ...(lastYearData?.player.unscoredEvents ?? []),
    ...(yearBeforeLastData?.player.scoredEvents ?? []),
    ...(yearBeforeLastData?.player.unscoredEvents ?? []),
  ]);

  const data = buildChartDataFromEvents(allEvents, year);
  return { data, isLoading: false, isError: false };
};
