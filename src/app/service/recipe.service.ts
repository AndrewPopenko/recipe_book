import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe 1',
      'This is simply a test 1 ',
      'https://www.simplyrecipes.com/thmb/ObstB0aXAmOO7sbsMIN7hixgD0Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Chicken-Korma-LEAD-1-68475a749cd646b89137c9f6fddf6122.jpg',
      [
        new Ingredient('item 1.1', 1),
        new Ingredient('item 1.2', 2)
      ]),
    new Recipe(
      'A test recipe 2 ',
      'This is simply a test 2',
      'https://www.simplyrecipes.com/thmb/ObstB0aXAmOO7sbsMIN7hixgD0Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Chicken-Korma-LEAD-1-68475a749cd646b89137c9f6fddf6122.jpg',
      [
        new Ingredient('item 2.1', 3),
        new Ingredient('item 2.2', 4)
      ])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }
}
