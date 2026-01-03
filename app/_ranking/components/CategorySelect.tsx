'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  createListCollection,
  Flex,
  Portal,
  SegmentGroup,
  Select,
} from '@chakra-ui/react';

import { AVAILABLE_CATEGORIES, CategoryType, Gender } from '../categories';

interface Props {
  value: string | null;
  onChange: (value: string | null) => unknown;
}

export const CategorySelect = ({ value, onChange }: Props) => {
  const [gender, setGender] = useState<Gender>(Gender.Male);
  const [categoryType, setCategoryType] = useState<CategoryType>(
    CategoryType.Absolute,
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

  useEffect(() => {
    onChange(selectCollection.items[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCollection]);

  return (
    <Box>
      <Flex gap={{ smDown: '4', sm: '2' }} direction={{ smDown: 'column' }}>
        <Box>
          <SegmentGroup.Root
            size="lg"
            defaultValue={gender}
            onValueChange={(e) => setGender(e.value as Gender)}
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
            onValueChange={(e) => setCategoryType(e.value as CategoryType)}
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

      <Select.Root
        mt={{ smDown: '4', sm: '2' }}
        size={{ smDown: 'lg', sm: 'md' }}
        collection={selectCollection}
        value={value ? [value] : []}
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
    </Box>
  );
};
