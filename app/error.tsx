'use client';

import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <Container maxW="md" py={{ base: 20, md: 40 }}>
      <Stack gap={4} textAlign="center">
        <Box>
          <Heading size="4xl" mb={2}>
            500
          </Heading>
          <Heading size="lg" fontWeight="semibold" mb={4}>
            Algo deu errado
          </Heading>
          <Text fontSize="lg" color="fg.muted" mb={6}>
            Um erro indesperado ocorreu. Por favor tente novamente ou fale com o
            suporte se o problema persistir.
          </Text>
        </Box>

        <Stack
          direction={{ base: 'column', sm: 'row' }}
          gap={4}
          justify="center"
        >
          <Button size="lg" onClick={() => reset()}>
            Tente novamente
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              Voltar à página inicial
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
