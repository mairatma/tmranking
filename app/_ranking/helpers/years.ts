import { createListCollection } from '@chakra-ui/react';

const INITIAL_YEAR = 2005;

export const getCurrentYear = () => new Date().getFullYear();

export const getYearsList = () => {
  const yearsCount = getCurrentYear() - INITIAL_YEAR + 1;

  const years = Array.from(
    { length: yearsCount },
    (_, index) => INITIAL_YEAR + index,
  );
  years.sort((a, b) => b - a);

  return years.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));
};

export const createYearsCollection = () => {
  return createListCollection({ items: getYearsList() });
};
