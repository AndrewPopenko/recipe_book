import { Component, OnDestroy, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import { ShoppingListService } from "../service/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[] = [];
  private subscription: any;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (list: Ingredient[]) => {
        this.ingredients = list;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editIngredient(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
