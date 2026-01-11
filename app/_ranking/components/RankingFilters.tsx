'use client';

import { Box, createListCollection, Portal, Select } from '@chakra-ui/react';

import { AVAILABLE_CATEGORIES } from '../categories';
import { RankingOptions } from '../types';
import { AVAILABLE_REGIONS } from '../regions';
import { CategoryChooser } from '@/app/_components/CategoryChooser';

const REGION_COLLECTION = createListCollection({ items: AVAILABLE_REGIONS });

interface Props {
  value: RankingOptions;
  onChange: (value: RankingOptions) => unknown;
}

export const RankingFilters = ({ value, onChange }: Props) => {
  return (
    <Box>
      <CategoryChooser
        categories={AVAILABLE_CATEGORIES}
        value={value.category}
        onChange={(category) => {
          onChange({ ...value, category });
        }}
      />
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
    </Box>
  );
};
