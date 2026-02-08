'use client';

import { useState } from 'react';

import {
  Button,
  CloseButton,
  createListCollection,
  Drawer,
  Flex,
  Portal,
} from '@chakra-ui/react';

import { CategoryChooser } from '@/app/_components/CategoryChooser';
import { Select } from '@/app/_components/Select';

import { AVAILABLE_CATEGORIES, CategoryType } from '../categories';
import { createYearsCollection, getCurrentYear } from '../helpers/years';
import { AVAILABLE_REGIONS } from '../regions';
import { RankingOptions } from '../types';

const REGION_COLLECTION = createListCollection({ items: AVAILABLE_REGIONS });
const YEARS_COLLECTION = createYearsCollection();

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
          Trocar filtros
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
              <Drawer.Title>Escolha a categoria, região e ano</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <CategoryChooser
                categories={NON_RATING_CATEGORIES}
                value={filters.category}
                onChange={(category) => {
                  setFilters({ ...filters, category });
                }}
              />

              <Flex gap="3">
                <Select
                  mt={{ smDown: '4', sm: '2' }}
                  flex="2"
                  size="md"
                  label="Região"
                  placeholder="Selecione a região"
                  collection={REGION_COLLECTION}
                  value={filters.region}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      region: value ?? '',
                    })
                  }
                />

                <Select
                  mt={{ smDown: '4', sm: '2' }}
                  flex="1"
                  size="md"
                  label="Ano"
                  placeholder="Selecione o ano"
                  collection={YEARS_COLLECTION}
                  value={(filters.year ?? getCurrentYear()).toString()}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      year: value ? Number(value) : undefined,
                    })
                  }
                />
              </Flex>
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
