'use client';

import {
  Button,
  CloseButton,
  createListCollection,
  Drawer,
  Portal,
  Select,
} from '@chakra-ui/react';

import { AVAILABLE_CATEGORIES, CategoryType } from '../categories';
import { RankingOptions } from '../types';
import { AVAILABLE_REGIONS } from '../regions';
import { CategoryChooser } from '@/app/_components/CategoryChooser';
import { useState } from 'react';

const REGION_COLLECTION = createListCollection({ items: AVAILABLE_REGIONS });

const NON_RATING_CATEGORIES = AVAILABLE_CATEGORIES.filter(
  ({ type }) => type !== CategoryType.Rating,
);

interface Props {
  value: RankingOptions;
  onChange: (value: RankingOptions) => unknown;
}

export const RankingFilters = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<RankingOptions>(value);

  const handleConfirm = () => {
    onChange(filters);
    setOpen(false);
  };

  return (
    <Drawer.Root
      placement={{ sm: 'top', smDown: 'bottom' }}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Trocar categoria e região
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            roundedTop={{ sm: undefined, smDown: 'l3' }}
            roundedBottom={{ sm: 'l3', smDown: undefined }}
          >
            <Drawer.Header>
              <Drawer.Title>Escolha a categoria</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <CategoryChooser
                categories={NON_RATING_CATEGORIES}
                value={filters.category}
                onChange={(category) => {
                  setFilters({ ...filters, category });
                }}
              />

              <Select.Root
                mt={{ smDown: '4', sm: '2' }}
                size="md"
                collection={REGION_COLLECTION}
                value={[filters.region]}
                onValueChange={(e) =>
                  setFilters({
                    ...filters,
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
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Drawer.ActionTrigger>
              <Button onClick={handleConfirm}>Confirmar</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
