import React from 'react';
import Head from 'next/head';
import { Box, Typography, Container, Button } from '@mui/material';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Recipe Generator</title>
        <meta name="description" content="Generate personalized recipes based on your ingredients and preferences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="lg">
          <Box sx={{ my: 4, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              AI Recipe Generator
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              Transform your ingredients into delicious meals
            </Typography>
            <Typography variant="body1" paragraph>
              Enter the ingredients you have on hand, specify any dietary preferences,
              and let our AI create personalized recipes just for you.
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Start Cooking
            </Button>
          </Box>
        </Container>
      </main>
    </>
  );
}