import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipeService } from "../../service/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeItem = new Recipe('', '', '', []);
  id: number | undefined;
  // @ts-ignore
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe( (params: Params) => {
        this.id = +params['id'];
        this.recipeItem = this.recipeService.getRecipe(this.id);
      });
  }

  onAddToShoppingList() {
    this
      .recipeService
      .addIngredientsToShoppingList(this.recipeItem.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    // @ts-ignore
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
