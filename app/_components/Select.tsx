'use client';

import {
  Portal,
  Select as ChakraSelect,
  SelectRootProps,
} from '@chakra-ui/react';

interface Props extends Omit<SelectRootProps, 'value' | 'onChange'> {
  value?: string;
  onChange: (newValue: string | null) => void;
}

export const Select = ({ collection, value, onChange }: Props) => {
  return (
    <ChakraSelect.Root
      mt={{ smDown: '4', sm: '2' }}
      size="md"
      collection={collection}
      value={value ? [value] : undefined}
      onValueChange={(e) => onChange(e.value[0] ?? null)}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label>Região</ChakraSelect.Label>
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder="Selecione a região" />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {collection.items.map((item) => (
              <ChakraSelect.Item item={item} key={item.value}>
                {item.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};
