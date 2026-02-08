'use client';

import {
  Portal,
  Select as ChakraSelect,
  SelectRootProps,
} from '@chakra-ui/react';

interface Props extends Omit<SelectRootProps, 'value' | 'onChange'> {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (newValue: string | null) => void;
}

export const Select = ({
  collection,
  label,
  placeholder,
  value,
  onChange,
  ...otherProps
}: Props) => {
  return (
    <ChakraSelect.Root
      {...otherProps}
      collection={collection}
      value={value ? [value] : undefined}
      onValueChange={(e) => onChange(e.value[0] ?? null)}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label>{label}</ChakraSelect.Label>
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
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
