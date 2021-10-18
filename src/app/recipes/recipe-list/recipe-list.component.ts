import { Component, OnInit } from '@angular/core';
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [
    new RecipeModel(
      'A test recipe',
      'This is simply a test',
      'https://www.simplyrecipes.com/thmb/ObstB0aXAmOO7sbsMIN7hixgD0Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Chicken-Korma-LEAD-1-68475a749cd646b89137c9f6fddf6122.jpg'),
    new RecipeModel(
      'A test recipe',
      'This is simply a test',
      'https://www.simplyrecipes.com/thmb/ObstB0aXAmOO7sbsMIN7hixgD0Y=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__05__Chicken-Korma-LEAD-1-68475a749cd646b89137c9f6fddf6122.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
