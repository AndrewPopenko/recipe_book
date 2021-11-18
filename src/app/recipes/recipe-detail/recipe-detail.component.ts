import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipeService } from "../../service/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeItem = new Recipe('', '', '', []);

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onAddToShoppingList() {
    this
      .recipeService
      .addIngredientsToShoppingList(this.recipeItem.ingredients);
  }

}
