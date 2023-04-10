import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../recipes/recipe";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httClient: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    console.log(`recipes = ${ JSON.stringify(recipes) }`);
    this.httClient.put('https://ng-course-recipe-book-79a0e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes).subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httClient
      .get<Recipe[]>('https://ng-course-recipe-book-79a0e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }));
  }
}
