import { Schema, model, models } from "mongoose";

const RecipeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "You must give it a name"],
  },
  ingredients: {
    type: [String],
    required: [
      true,
      "You must write all ingredients that you use in your receipe",
    ],
  },
  recipeInst: {
    type: [String],
    required: [true, "You must describe the cooking process"],
  },
  tags: {
    type: [String],
    required: [true, "Give your recipe a tag so users can find it"],
  },
  timeNeeded: {
    type: Number,
    required: [true, "How long will it take to cook your recepie"],
  },
  image: {
    type: String,
    required: [true, "Please upload an image file"],
  },
  rating: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
      },
    },
  ],
});

const Recipe = models.Recipe || model("Recipe", RecipeSchema);
export default Recipe;
