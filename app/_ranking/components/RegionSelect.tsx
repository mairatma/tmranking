'use client';

import { createListCollection, Portal, Select } from '@chakra-ui/react';

import { AVAILABLE_REGIONS } from '../regions';

interface Props {
  value: string | null;
  onChange: (value: string | null) => unknown;
}

const selectCollection = createListCollection({ items: AVAILABLE_REGIONS });

export const RegionSelect = ({ value, onChange }: Props) => {
  return (
    <Select.Root
      mt={{ smDown: '4', sm: '2' }}
      size={{ smDown: 'lg', sm: 'md' }}
      collection={selectCollection}
      value={value ? [value] : []}
      onValueChange={(e) => onChange(e.value[0] ?? null)}
    >
      <Select.HiddenSelect />
      <Select.Label>Região</Select.Label>
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
  );
};
