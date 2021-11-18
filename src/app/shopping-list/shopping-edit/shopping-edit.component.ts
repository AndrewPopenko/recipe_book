import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../../service/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputReference: ElementRef = new ElementRef<any>('nameInput');
  @ViewChild('amountInput') amountInputReference: ElementRef = new ElementRef<any>('amountInput');

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {}

  addIngredient() {
    const newIngredient = new Ingredient(
      this.nameInputReference.nativeElement.value,
      this.amountInputReference.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
