'use client';

import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxW="md" py={{ base: 20, md: 40 }}>
      <Stack gap={2} textAlign="center">
        <Box>
          <Heading size="3xl" mb={4}>
            Página não encontrada
          </Heading>
          <Text fontSize="lg" color="fg.muted" mb={6}>
            Infelizmente a página que você está procurando não existe.
          </Text>
        </Box>

        <Stack
          direction={{ base: 'column', sm: 'row' }}
          gap={4}
          justify="center"
        >
          <Link href="/">
            <Button size="lg">Voltar à página inicial</Button>
          </Link>
          <Link href="/tournaments">
            <Button variant="outline" size="lg">
              Ver torneios
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
