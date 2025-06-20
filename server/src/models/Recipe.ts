import mongoose from 'mongoose';

export interface IRecipe extends mongoose.Document {
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
    optional: boolean;
  }[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  cuisineType: string;
  dietaryCategories: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdBy: mongoose.Types.ObjectId;
  aiGenerated: boolean;
  imageUrl: string;
  ratings: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
          trim: true,
        },
        optional: {
          type: Boolean,
          default: false,
        },
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    prepTime: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    cuisineType: {
      type: String,
      required: true,
      trim: true,
    },
    dietaryCategories: [
      {
        type: String,
        enum: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb', 'none'],
      },
    ],
    nutritionalInfo: {
      calories: {
        type: Number,
      },
      protein: {
        type: Number,
      },
      carbs: {
        type: Number,
      },
      fat: {
        type: Number,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    aiGenerated: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          trim: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Recipe = mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;