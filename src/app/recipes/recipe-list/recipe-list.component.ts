import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipeService } from "../../service/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesList: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipesList = this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipesList = recipes;
    });
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
