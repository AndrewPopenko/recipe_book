import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeModel } from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: RecipeModel;
  @Output() recipeSelected: EventEmitter<RecipeModel> = new EventEmitter<RecipeModel>();

  constructor() {
    this.recipe = new RecipeModel(
      ' ',
      '',
      '');
  }

  selectRecipe() {
    this.recipeSelected.emit(this.recipe);
  }
}
