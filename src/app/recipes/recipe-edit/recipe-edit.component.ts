import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../recipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id = 0;
  editMode = false;
  recipeForm?: FormGroup;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm?.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm?.value);
    }

    this.onCancel();
  }

  get controls(): AbstractControl[] {
    return (<FormArray>this.recipeForm?.get('ingredients')).controls;
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm?.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }),
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteControl(index: number) {
    (<FormArray>this.recipeForm?.get('ingredients')).removeAt(index);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onRemoveAllIngredients() {
    (<FormArray>this.recipeForm?.get('ingredients')).clear();
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    // @ts-ignore
    let ingredients: FormArray = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imgPath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            }),
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: ingredients,
    });
  }
}
