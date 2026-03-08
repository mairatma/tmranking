import { Gender } from '@/app/_ranking/categories';

export const MALE_RATING_MIN_POINTS = [
  { name: 'RAM', min: 3300, absoluteType: 'A' },
  { name: 'RBM', min: 2800, absoluteType: 'A' },
  { name: 'RCM', min: 2300, absoluteType: 'B' },
  { name: 'RDM', min: 1900, absoluteType: 'B' },
  { name: 'REM', min: 1600, absoluteType: 'C' },
  { name: 'RFM', min: 1300, absoluteType: 'C' },
  { name: 'RGM', min: 1000, absoluteType: 'D' },
  { name: 'RHM', min: 850, absoluteType: 'D' },
  { name: 'RIM', min: 700, absoluteType: 'E' },
  { name: 'RJM', min: 550, absoluteType: 'E' },
  { name: 'RLM', min: 400, absoluteType: 'F' },
  { name: 'RMM', min: 350, absoluteType: 'F' },
  { name: 'RNM', min: 251, absoluteType: 'G' },
  { name: 'ROM', min: 0, absoluteType: 'G' },
];

export const FEMALE_RATING_MIN_POINTS = [
  { name: 'RAM', min: 2500, absoluteType: 'A' },
  { name: 'RBM', min: 2000, absoluteType: 'A' },
  { name: 'RCM', min: 1400, absoluteType: 'B' },
  { name: 'RDM', min: 1000, absoluteType: 'B' },
  { name: 'REM', min: 700, absoluteType: 'C' },
  { name: 'RFM', min: 600, absoluteType: 'C' },
  { name: 'RGM', min: 500, absoluteType: 'D' },
  { name: 'RHM', min: 400, absoluteType: 'D' },
  { name: 'RIM', min: 251, absoluteType: 'E' },
  { name: 'RJM', min: 0, absoluteType: 'E' },
];

const getRatingPointsArray = (gender: Gender) => {
  return gender === Gender.Male
    ? MALE_RATING_MIN_POINTS
    : FEMALE_RATING_MIN_POINTS;
};

const getRating = (points: number, gender: Gender) => {
  const minPointsArr = getRatingPointsArray(gender);

  const index = minPointsArr.findIndex(({ min }) => points >= min);
  const finalIndex = index === -1 ? minPointsArr.length - 1 : index;

  return minPointsArr[finalIndex];
};

export const getRatingName = (points: number, gender: Gender) => {
  return getRating(points, gender).name;
};

export const getRatingAbsoluteType = (points: number, gender: Gender) => {
  return getRating(points, gender).absoluteType;
};
