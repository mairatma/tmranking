import { Button, CloseButton, Drawer, Portal } from '@chakra-ui/react';
import { CategoryChooser } from './CategoryChooser';
import { Category } from '../_ranking/categories';
import { useState } from 'react';

interface Props {
  categories: Category[];
  value: string;
  onSelect: (category: string) => void;
}

export const CategoryChooserDrawer = ({
  categories,
  value,
  onSelect,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(value);

  const handleConfirm = () => {
    onSelect(category);
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
          Trocar categoria
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
                categories={categories}
                value={category}
                onChange={setCategory}
              />
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
