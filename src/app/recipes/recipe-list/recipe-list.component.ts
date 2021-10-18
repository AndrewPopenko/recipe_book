import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeEventModel, RecipeModel } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Input() recipesList: RecipeModel[] | undefined;
  @Output() returnSelectedRecipe: EventEmitter<RecipeModel> = new EventEmitter<RecipeModel>();

  constructor() { }

  ngOnInit(): void {
  }

  getRecipeSelected(recipe: RecipeModel) {
    this.returnSelectedRecipe.emit(recipe);
  }
}
