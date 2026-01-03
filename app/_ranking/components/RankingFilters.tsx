'use client';

import { useMemo, useState } from 'react';

import {
  Box,
  createListCollection,
  Flex,
  Portal,
  SegmentGroup,
  Select,
} from '@chakra-ui/react';

import { AVAILABLE_CATEGORIES, CategoryType, Gender } from '../categories';
import { RankingOptions } from '../types';
import { AVAILABLE_REGIONS } from '../regions';

const REGION_COLLECTION = createListCollection({ items: AVAILABLE_REGIONS });

interface Props {
  value: RankingOptions;
  onChange: (value: RankingOptions) => unknown;
}

export const RankingFilters = ({ value, onChange }: Props) => {
  const findCategory = value
    ? AVAILABLE_CATEGORIES.find((item) => item.value === value.category)
    : null;

  const [gender, setGender] = useState<Gender>(
    findCategory?.gender ?? Gender.Male,
  );
  const [categoryType, setCategoryType] = useState<CategoryType>(
    findCategory?.type ?? CategoryType.Absolute,
  );

  const selectCollection = useMemo(() => {
    return createListCollection({
      items: AVAILABLE_CATEGORIES.filter(
        (item) => item.gender === gender && item.type === categoryType,
      ).map((item) => ({
        value: item.value,
        label: item.label,
      })),
    });
  }, [gender, categoryType]);

  const handleGenderChange = (newGender: Gender) => {
    const firstOption = AVAILABLE_CATEGORIES.find(
      (item) => item.gender === newGender && item.type === categoryType,
    );
    setGender(newGender);
    onChange({
      ...value,
      category: firstOption!.value,
    });
  };

  const handleCategoryTypeChange = (newCategoryType: CategoryType) => {
    const firstOption = AVAILABLE_CATEGORIES.find(
      (item) => item.gender === gender && item.type === newCategoryType,
    );
    setCategoryType(newCategoryType);
    onChange({
      ...value,
      category: firstOption!.value,
    });
  };

  return (
    <Box>
      <Flex gap={{ smDown: '4', sm: '2' }} direction={{ smDown: 'column' }}>
        <Box>
          <SegmentGroup.Root
            size="lg"
            defaultValue={gender}
            onValueChange={(e) => handleGenderChange(e.value as Gender)}
          >
            <SegmentGroup.Indicator bgColor="teal.200" />
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
            size="lg"
            defaultValue={categoryType}
            onValueChange={(e) =>
              handleCategoryTypeChange(e.value as CategoryType)
            }
          >
            <SegmentGroup.Indicator bgColor="teal.200" />
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

      <Flex gap={{ smDown: '2', sm: '4' }} direction={{ smDown: 'column' }}>
        <Select.Root
          mt={{ smDown: '4', sm: '2' }}
          size="md"
          collection={selectCollection}
          value={[value.category]}
          onValueChange={(e) =>
            onChange({
              ...value,
              category: e.value[0] ?? null,
            })
          }
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
                {selectCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        <Select.Root
          mt={{ smDown: '4', sm: '2' }}
          size="md"
          collection={REGION_COLLECTION}
          value={[value.region]}
          onValueChange={(e) =>
            onChange({
              ...value,
              region: e.value[0] ?? null,
            })
          }
        >
          <Select.HiddenSelect />
          <Select.Label>Região</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Selecione a região" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {REGION_COLLECTION.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Flex>
    </Box>
  );
};
