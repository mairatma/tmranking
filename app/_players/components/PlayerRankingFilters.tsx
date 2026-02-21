'use client';

import { useState } from 'react';

import { Button, CloseButton, Drawer, Portal, Stack } from '@chakra-ui/react';

import { CategoryChooser } from '@/app/_components/CategoryChooser';
import { Select } from '@/app/_components/Select';
import { AVAILABLE_CATEGORIES, CategoryType } from '@/app/_ranking/categories';

import { createYearsCollection } from '@/app/_ranking/helpers/years';

const YEARS_COLLECTION = createYearsCollection();

export interface PlayerRankingOptions {
  category: string;
  year: number;
}

const NON_RATING_CATEGORIES = AVAILABLE_CATEGORIES.filter(
  ({ type }) => type !== CategoryType.Rating,
);

interface Props {
  value: PlayerRankingOptions;
  onChange: (value: PlayerRankingOptions) => unknown;
}

export const PlayerRankingFilters = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<PlayerRankingOptions>(value);

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
          Trocar categoria e ano
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content
            roundedTop={{ sm: undefined, smDown: 'l3' }}
            roundedBottom={{ sm: 'l3', smDown: undefined }}
            onClick={(event) => {
              // Prevent clicks inside the drawer closing it (for dropdowns that have
              // items on top of the backdrop, for example).
              event.stopPropagation();
            }}
          >
            <Drawer.Header>
              <Drawer.Title>Escolha categoria e ano</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <Stack>
                <CategoryChooser
                  categories={NON_RATING_CATEGORIES}
                  value={filters.category}
                  onChange={(category) => {
                    setFilters({ ...filters, category });
                  }}
                />

                <Select
                  flex="1"
                  size="md"
                  label="Ano"
                  collection={YEARS_COLLECTION}
                  value={filters.year.toString()}
                  onChange={(value) =>
                    setFilters({ ...filters, year: Number(value) })
                  }
                />
              </Stack>
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
