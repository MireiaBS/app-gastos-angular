import { Component } from '@angular/core';
import { ExpenseItemComponent } from "../expense-item/expense-item.component";

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [ExpenseItemComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
