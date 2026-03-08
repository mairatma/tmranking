import { Gender } from '@/app/_ranking/categories';

export const MALE_RATING_MIN_POINTS = [
  { name: 'A', min: 3300, absoluteType: 'A' },
  { name: 'B', min: 2800, absoluteType: 'A' },
  { name: 'C', min: 2300, absoluteType: 'B' },
  { name: 'D', min: 1900, absoluteType: 'B' },
  { name: 'E', min: 1600, absoluteType: 'C' },
  { name: 'F', min: 1300, absoluteType: 'C' },
  { name: 'G', min: 1000, absoluteType: 'D' },
  { name: 'H', min: 850, absoluteType: 'D' },
  { name: 'I', min: 700, absoluteType: 'E' },
  { name: 'J', min: 550, absoluteType: 'E' },
  { name: 'L', min: 400, absoluteType: 'F' },
  { name: 'M', min: 350, absoluteType: 'F' },
  { name: 'N', min: 251, absoluteType: 'G' },
  { name: 'O', min: 0, absoluteType: 'G' },
];

export const FEMALE_RATING_MIN_POINTS = [
  { name: 'A', min: 2500, absoluteType: 'A' },
  { name: 'B', min: 2000, absoluteType: 'A' },
  { name: 'C', min: 1400, absoluteType: 'B' },
  { name: 'D', min: 1000, absoluteType: 'B' },
  { name: 'E', min: 700, absoluteType: 'C' },
  { name: 'F', min: 600, absoluteType: 'C' },
  { name: 'G', min: 500, absoluteType: 'D' },
  { name: 'H', min: 400, absoluteType: 'D' },
  { name: 'I', min: 251, absoluteType: 'E' },
  { name: 'J', min: 0, absoluteType: 'E' },
];

const getRatingPointsArray = (gender: Gender) => {
  return gender === Gender.Male
    ? MALE_RATING_MIN_POINTS
    : FEMALE_RATING_MIN_POINTS;
};

export const getRating = (points: number, gender: Gender) => {
  const minPointsArr = getRatingPointsArray(gender);

  const index = minPointsArr.findIndex(({ min }) => points >= min);
  const finalIndex = index === -1 ? minPointsArr.length - 1 : index;

  return minPointsArr[finalIndex];
};

export const getRatingName = (points: number, gender: Gender) => {
  return getRating(points, gender).name;
};
