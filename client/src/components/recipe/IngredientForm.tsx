import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Ingredient {
  name: string;
}

interface IngredientFormProps {
  onSubmit: (ingredients: Ingredient[]) => void;
}

export default function IngredientForm({ onSubmit }: IngredientFormProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== '') {
      setIngredients([...ingredients, { name: currentIngredient.trim() }]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      onSubmit(ingredients);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        What ingredients do you have?
      </Typography>
      
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add ingredient"
          value={currentIngredient}
          onChange={(e) => setCurrentIngredient(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddIngredient())}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddIngredient}
          sx={{ ml: 1 }}
        >
          <AddIcon />
        </Button>
      </Box>

      {ingredients.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Your ingredients:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient.name}
                onDelete={() => handleRemoveIngredient(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Paper>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={ingredients.length === 0}
        size="large"
      >
        Generate Recipes
      </Button>
    </Box>
  );
}