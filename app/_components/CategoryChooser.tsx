import {
  Box,
  createListCollection,
  Flex,
  Portal,
  SegmentGroup,
  Select,
} from '@chakra-ui/react';

import { Category, CategoryType, Gender } from '../_ranking/categories';

const CATEGORY_TYPE_TO_NAME: Record<CategoryType, string> = {
  [CategoryType.Absolute]: 'Absoluto',
  [CategoryType.Ranking]: 'Ranking',
  [CategoryType.Rating]: 'Rating',
};
const CATEGORY_TYPES_ORDER = [
  CategoryType.Absolute,
  CategoryType.Ranking,
  CategoryType.Rating,
];

interface Props {
  categories: Category[];
  value: string;
  onChange: (newCategory: string) => void;
}

export const CategoryChooser = ({ categories, value, onChange }: Props) => {
  const filterByGenderAndType = (
    gender: Gender,
    categoryType: CategoryType,
  ) => {
    return categories.filter(
      (item) => item.gender === gender && item.type === categoryType,
    );
  };

  const categoryObj = value
    ? categories.find((item) => item.value === value)
    : null;
  const gender = categoryObj?.gender ?? Gender.Male;
  const categoryType = categoryObj?.type ?? CategoryType.Absolute;

  const categoryCollection = createListCollection({
    items: filterByGenderAndType(gender, categoryType).map((item) => ({
      value: item.value,
      label: item.label,
    })),
  });

  const handleGenderChange = (newGender: Gender) => {
    onChange(filterByGenderAndType(newGender, categoryType)![0].value);
  };

  const handleCategoryTypeChange = (newCategoryType: CategoryType) => {
    onChange(filterByGenderAndType(gender, newCategoryType)![0].value);
  };

  const checkHasGender = (genderToCheck: Gender) => {
    return filterByGenderAndType(genderToCheck, categoryType).length > 0;
  };

  const checkHasCategoryType = (type: CategoryType) => {
    return filterByGenderAndType(gender, type).length > 0;
  };

  return (
    <Box>
      <Flex gap={{ smDown: '4', sm: '2' }} direction={{ smDown: 'column' }}>
        <Box>
          <SegmentGroup.Root
            defaultValue={gender}
            onValueChange={(e) => handleGenderChange(e.value as Gender)}
          >
            <SegmentGroup.Indicator bgColor="primary.200" />
            <SegmentGroup.Item
              value={Gender.Male}
              disabled={!checkHasGender(Gender.Male)}
            >
              <SegmentGroup.ItemText>MAS</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item
              value={Gender.Female}
              disabled={!checkHasGender(Gender.Female)}
            >
              <SegmentGroup.ItemText>FEM</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          </SegmentGroup.Root>
        </Box>

        <Box>
          <SegmentGroup.Root
            defaultValue={categoryType}
            onValueChange={(e) =>
              handleCategoryTypeChange(e.value as CategoryType)
            }
          >
            <SegmentGroup.Indicator bgColor="primary.200" />

            {CATEGORY_TYPES_ORDER.map((type) =>
              checkHasCategoryType(type) ? (
                <SegmentGroup.Item key={type} value={type}>
                  <SegmentGroup.ItemText textTransform="uppercase">
                    {CATEGORY_TYPE_TO_NAME[type]}
                  </SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              ) : null,
            )}
          </SegmentGroup.Root>
        </Box>
      </Flex>

      <Select.Root
        mt={{ smDown: '4', sm: '2' }}
        size="md"
        collection={categoryCollection}
        value={[value]}
        onValueChange={(e) => onChange(e.value[0] ?? null)}
      >
        <Select.HiddenSelect />
        <Select.Label>Categoria</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Selecione a categoria" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoryCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
};
