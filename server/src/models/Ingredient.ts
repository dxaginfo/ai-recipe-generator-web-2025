import mongoose from 'mongoose';

export interface IIngredient extends mongoose.Document {
  name: string;
  category: string;
  alternativeNames: string[];
  commonSubstitutes: string[];
  nutritionalValue: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['protein', 'vegetable', 'fruit', 'grain', 'dairy', 'spice', 'oil', 'sweetener', 'other'],
  },
  alternativeNames: [
    {
      type: String,
      trim: true,
    },
  ],
  commonSubstitutes: [
    {
      type: String,
      trim: true,
    },
  ],
  nutritionalValue: {
    calories: {
      type: Number,
      default: 0,
    },
    protein: {
      type: Number,
      default: 0,
    },
    carbs: {
      type: Number,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0,
    },
  },
});

const Ingredient = mongoose.model<IIngredient>('Ingredient', IngredientSchema);

export default Ingredient;