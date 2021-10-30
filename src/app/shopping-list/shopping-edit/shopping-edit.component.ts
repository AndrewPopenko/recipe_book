import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputReference: ElementRef = new ElementRef<any>('nameInput');
  @ViewChild('amountInput') amountInputReference: ElementRef = new ElementRef<any>('amountInput');
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
    console.log('ShoppingEditComponent');
  }

  addIngredient() {
    const newIngredient = new Ingredient(
      this.nameInputReference.nativeElement.value,
      this.amountInputReference.nativeElement.value);
    this.ingredientAdded.emit(newIngredient);
  }
}
