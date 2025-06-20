import express from 'express';
import { 
  generateRecipes, 
  getAllRecipes, 
  getRecipeById, 
  getUserRecipes,
  saveRecipe,
  removeSavedRecipe
} from '../controllers/recipeController';
import auth from '../middleware/auth';

const router = express.Router();

// @route   POST /api/recipes/generate
// @desc    Generate recipes based on ingredients
// @access  Public
router.post('/generate', generateRecipes);

// @route   GET /api/recipes
// @desc    Get all recipes
// @access  Public
router.get('/', getAllRecipes);

// @route   GET /api/recipes/:id
// @desc    Get recipe by ID
// @access  Public
router.get('/:id', getRecipeById);

// @route   GET /api/recipes/user
// @desc    Get user's saved recipes
// @access  Private
router.get('/user', auth, getUserRecipes);

// @route   POST /api/recipes/save/:id
// @desc    Save recipe to user profile
// @access  Private
router.post('/save/:id', auth, saveRecipe);

// @route   DELETE /api/recipes/save/:id
// @desc    Remove saved recipe from user profile
// @access  Private
router.delete('/save/:id', auth, removeSavedRecipe);

export default router;