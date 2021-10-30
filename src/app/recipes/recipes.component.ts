import { Component, OnInit } from '@angular/core';
import { RecipeEventModel, RecipeModel } from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  isDetailView = false;
  selectedRecipe: RecipeModel | undefined;

  recipes: RecipeModel[] = [
    new RecipeModel(
      'A test recipe 1',
      'This is simply a test 1 ',
      'https://www.simplyrecipes.com/thmb/ObstB0aXAmOO7sbsMIN7hixgD0Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Chicken-Korma-LEAD-1-68475a749cd646b89137c9f6fddf6122.jpg'),
    new RecipeModel(
      'A test recipe 2 ',
      'This is simply a test 2',
      'https://www.simplyrecipes.com/thmb/ObstB0aXAmOO7sbsMIN7hixgD0Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Chicken-Korma-LEAD-1-68475a749cd646b89137c9f6fddf6122.jpg')
  ];


  constructor() {
    // this.selectedRecipe = new RecipeModel('', '', '');
  }

  ngOnInit(): void {
  }
}
