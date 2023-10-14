import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './aut.service';
import { Api } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private httClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.httClient.put(Api.baseUrl + '/recipes.json', recipes).subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.httClient.get<Recipe[]>(Api.baseUrl + '/recipes.json').pipe(
      map((recipes: Recipe[]) => {
        return recipes.map((recipe: Recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }),
    );
  }
}
