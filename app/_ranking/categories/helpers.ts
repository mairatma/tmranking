import { getRating } from '@/app/_players/rating/categories';

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

const getPlayerRatingBasedCategories = (
  gender: Gender,
  ratingScore: number,
) => {
  const rating = getRating(ratingScore, gender);

  const absoluteCategory = AVAILABLE_CATEGORIES.find((category) => {
    return (
      category.gender === gender &&
      category.label.startsWith(`ABSOLUTO ${rating.absoluteType}`)
    );
  });

  const ratingCategory = AVAILABLE_CATEGORIES.find((category) => {
    return (
      category.gender === gender &&
      category.label.startsWith(`Rating ${rating.name}`)
    );
  });

  return { absoluteCategory, ratingCategory };
};

export const getPlayerCategories = (
  gender: Gender,
  age: number | null,
  ratingScore: number,
) => {
  const agedCategories = getPlayerRankingAgedCategories(gender, age);
  const { absoluteCategory, ratingCategory } = getPlayerRatingBasedCategories(
    gender,
    ratingScore,
  );

  const categoriesWithAbsolute = absoluteCategory
    ? [absoluteCategory, ...agedCategories]
    : agedCategories;

  return ratingCategory
    ? [...categoriesWithAbsolute, ratingCategory]
    : categoriesWithAbsolute;
};
