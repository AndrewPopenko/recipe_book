import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from "../../recipe";
import { RecipeService } from "../../../service/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe: Recipe  = new Recipe('', '', '', []);

  constructor(private recipeService: RecipeService) {}

  selectRecipe() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

  ngOnInit(): void {
  }
}
