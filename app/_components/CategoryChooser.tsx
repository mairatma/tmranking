import {
  Box,
  createListCollection,
  Flex,
  Portal,
  SegmentGroup,
  Select,
} from '@chakra-ui/react';

import { Category, CategoryType, Gender } from '../_ranking/categories';

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

  return (
    <Box>
      <Flex gap={{ smDown: '4', sm: '2' }} direction={{ smDown: 'column' }}>
        <Box>
          <SegmentGroup.Root
            defaultValue={gender}
            onValueChange={(e) => handleGenderChange(e.value as Gender)}
          >
            <SegmentGroup.Indicator bgColor="primary.200" />
            <SegmentGroup.Item value={Gender.Male}>
              <SegmentGroup.ItemText>MAS</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value={Gender.Female}>
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
            <SegmentGroup.Item value={CategoryType.Absolute}>
              <SegmentGroup.ItemText>ABSOLUTO</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value={CategoryType.Youth}>
              <SegmentGroup.ItemText>JOVEM</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value={CategoryType.Senior}>
              <SegmentGroup.ItemText>ADULTO</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
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
