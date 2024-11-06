import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ExpenseModalComponent } from "../expense-modal/expense-modal.component";

@Component({
  selector: 'nav-user',
  standalone: true,
  imports: [ExpenseModalComponent],
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})

export class NavUserComponent  {
  @ViewChild('modal') modal!: ExpenseModalComponent;


  openModal(): void {
    if (this.modal) {
      this.modal.openModal();
    }
  }
}
