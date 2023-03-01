import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../../service/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: any;
  editMode = false;
  editedIngredientIndex: number = -1;
  // @ts-ignore
  editedIngredient: Ingredient;
  // @ts-ignore
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editedIngredientIndex = index;
      this.editMode = true;
      this.editedIngredient = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      })
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubbmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIngredientIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.resetForm();
    this.editMode = false;
  }

  onClear(): void {
    this.slForm.resetForm();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.onClear();
  }
}
