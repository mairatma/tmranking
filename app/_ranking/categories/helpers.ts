import { getRatingAbsoluteType } from '@/app/_players/rating/categories';

import { AVAILABLE_CATEGORIES, CategoryType, Gender } from '.';

export const getPlayerRankingAgedCategories = (
  gender: Gender,
  age: number | null,
) => {
  if (!age) return [];

  const mainRankingCategoryIndex = AVAILABLE_CATEGORIES.findIndex(
    (category) => {
      if (
        category.gender !== gender ||
        category.type !== CategoryType.Ranking ||
        !category.maxAge
      )
        return false;

      return category.maxAge >= age;
    },
  );

  const mainRankingCategory = AVAILABLE_CATEGORIES[mainRankingCategoryIndex];
  const categories = [mainRankingCategory];
  if (mainRankingCategory.label.startsWith('SUB')) {
    categories.push(AVAILABLE_CATEGORIES[mainRankingCategoryIndex + 1]);
  }

  return categories;
};

const getPlayerAbsoluteRankingCategory = (
  gender: Gender,
  ratingScore: number,
) => {
  const absoluteType = getRatingAbsoluteType(ratingScore, gender);

  const category = AVAILABLE_CATEGORIES.find((category) => {
    return (
      category.gender === gender &&
      category.label.startsWith(`ABSOLUTO ${absoluteType}`)
    );
  });
  return category ?? null;
};

export const getPlayerRankingCategories = (
  gender: Gender,
  age: number | null,
  ratingScore: number,
) => {
  const agedCategories = getPlayerRankingAgedCategories(gender, age);
  const absoluteCategory = getPlayerAbsoluteRankingCategory(
    gender,
    ratingScore,
  );

  return absoluteCategory
    ? [...agedCategories, absoluteCategory]
    : agedCategories;
};
