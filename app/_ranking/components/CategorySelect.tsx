'use client';

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';

import { AVAILABLE_CATEGORIES } from '../categories';

interface Props {
  value: string | null;
  onChange: (value: string | null) => unknown;
}

export const CategorySelect = ({ value, onChange }: Props) => {
  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: AVAILABLE_CATEGORIES,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={value ? [value] : []}
      onValueChange={(e) => onChange(e.value[0] ?? null)}
      width="320px"
      smDown={{ width: '100%' }}
    >
      <Combobox.Label>Categoria</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Escreva para procurar" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>Nenhuma categoria encontrada</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};
