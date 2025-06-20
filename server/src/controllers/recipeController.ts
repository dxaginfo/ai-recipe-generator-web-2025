import { Request, Response } from 'express';
import Recipe from '../models/Recipe';
import User from '../models/User';
import { Configuration, OpenAIApi } from 'openai';

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Generate recipes based on ingredients
export const generateRecipes = async (req: Request, res: Response) => {
  try {
    const { ingredients, dietaryPreferences } = req.body;
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: 'Valid ingredients array is required' });
    }

    // Format dietary preferences string
    const dietaryString = dietaryPreferences && dietaryPreferences.length > 0
      ? `The recipe must be suitable for ${dietaryPreferences.join(', ')} diets.`
      : '';

    // Create prompt for OpenAI
    const prompt = `Generate a recipe using these ingredients: ${ingredients.join(', ')}. ${dietaryString}

Please provide the recipe in this format:

1. Recipe name
2. Brief description
3. Ingredients with measurements
4. Step-by-step instructions
5. Prep time and cook time
6. Servings
7. Cuisine type
8. Difficulty level
9. Nutritional information (calories, protein, carbs, fat)`;

    // Call OpenAI API
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Process and structure the AI-generated recipe
    const recipeText = completion.data.choices[0].text?.trim() || '';
    
    // Here you would parse the AI response into a structured recipe format
    // For simplicity, we'll return the raw text in this example
    // In a real implementation, you would parse this into JSON matching the Recipe model

    res.json({ recipe: recipeText });
  } catch (error) {
    console.error('Recipe generation error:', error);
    res.status(500).json({ message: 'Server error during recipe generation' });
  }
};

// Get all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    console.error('Get all recipes error:', error);
    res.status(500).json({ message: 'Server error while retrieving recipes' });
  }
};

// Get recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Get recipe by ID error:', error);
    res.status(500).json({ message: 'Server error while retrieving recipe' });
  }
};

// Get user's saved recipes
export const getUserRecipes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    const user = await User.findById(userId).populate('savedRecipes');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.savedRecipes);
  } catch (error) {
    console.error('Get user recipes error:', error);
    res.status(500).json({ message: 'Server error while retrieving user recipes' });
  }
};

// Save recipe to user profile
export const saveRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Recipe ID
    const userId = req.user?.id;
    
    // Check if recipe exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    // Update user's saved recipes
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedRecipes: id } }, // Use addToSet to avoid duplicates
      { new: true }
    ).populate('savedRecipes');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'Recipe saved successfully',
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    console.error('Save recipe error:', error);
    res.status(500).json({ message: 'Server error while saving recipe' });
  }
};

// Remove saved recipe from user profile
export const removeSavedRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Recipe ID
    const userId = req.user?.id;
    
    // Update user's saved recipes
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedRecipes: id } },
      { new: true }
    ).populate('savedRecipes');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      message: 'Recipe removed successfully',
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    console.error('Remove saved recipe error:', error);
    res.status(500).json({ message: 'Server error while removing saved recipe' });
  }
};