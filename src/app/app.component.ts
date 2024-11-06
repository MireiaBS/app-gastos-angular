import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavUserComponent } from "./components/nav-user/nav-user.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { ExpenseModalComponent } from './components/expense-modal/expense-modal.component';
import { ExpenseItemComponent } from './components/expense-item/expense-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavUserComponent, MainPageComponent, ExpenseModalComponent, ExpenseItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'App gastos';
}
