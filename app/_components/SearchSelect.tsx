'use client';

import { ReactNode } from 'react';

import {
  Combobox,
  ComboboxRootProps,
  Portal,
  useFilter,
  useListCollection,
} from '@chakra-ui/react';

interface Props extends Omit<
  ComboboxRootProps,
  'collection' | 'onInputValueChange' | 'value' | 'onValueChange' | 'onChange'
> {
  label: ReactNode;
  options: { label: string; value: string }[];
  value: string;
  onChange: (newValue: string) => void;
}

export const SearchSelect = ({
  label,
  options,
  value,
  onChange,
  ...otherProps
}: Props) => {
  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: options,
    filter: contains,
  });

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      value={[value]}
      onValueChange={(e) => onChange(e.value[0])}
      {...otherProps}
    >
      <Combobox.Label>{label}</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Digite para buscar" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>Nenhum jogador encontrado</Combobox.Empty>
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
