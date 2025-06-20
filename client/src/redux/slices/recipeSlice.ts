import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  imageUrl?: string;
  dietaryCategories: string[];
}

interface RecipeState {
  recipes: Recipe[];
  userRecipes: Recipe[];
  currentRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  userRecipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
};

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    fetchRecipesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
      state.loading = false;
    },
    fetchRecipesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentRecipe: (state, action: PayloadAction<Recipe>) => {
      state.currentRecipe = action.payload;
    },
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
    fetchUserRecipesSuccess: (state, action: PayloadAction<Recipe[]>) => {
      state.userRecipes = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchRecipesStart,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  setCurrentRecipe,
  clearCurrentRecipe,
  fetchUserRecipesSuccess,
} = recipeSlice.actions;

export default recipeSlice.reducer;