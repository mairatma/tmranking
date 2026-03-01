import { Gender } from '@/app/_ranking/categories';

export const MALE_RATING_MIN_POINTS = [
  { name: 'RAM', min: 3300 },
  { name: 'RBM', min: 2800 },
  { name: 'RCM', min: 2300 },
  { name: 'RDM', min: 1900 },
  { name: 'REM', min: 1600 },
  { name: 'RFM', min: 1300 },
  { name: 'RGM', min: 1000 },
  { name: 'RHM', min: 850 },
  { name: 'RIM', min: 700 },
  { name: 'RJM', min: 550 },
  { name: 'RLM', min: 400 },
  { name: 'RMM', min: 350 },
  { name: 'RNM', min: 251 },
  { name: 'ROM', min: 0 },
];

export const FEMALE_RATING_MIN_POINTS = [
  { name: 'RAM', min: 2500 },
  { name: 'RBM', min: 2000 },
  { name: 'RCM', min: 1400 },
  { name: 'RDM', min: 1000 },
  { name: 'REM', min: 700 },
  { name: 'RFM', min: 600 },
  { name: 'RGM', min: 500 },
  { name: 'RHM', min: 400 },
  { name: 'RIM', min: 251 },
  { name: 'RJM', min: 0 },
];

export const getRatingName = (points: number, gender: Gender) => {
  const minPointsArr =
    gender === Gender.Male ? MALE_RATING_MIN_POINTS : FEMALE_RATING_MIN_POINTS;

  return (
    minPointsArr.find(({ min }) => points >= min) ??
    minPointsArr[minPointsArr.length - 1]
  ).name;
};
