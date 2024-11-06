import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'expense-modal',
  standalone: true,
  imports: [],
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.css'
})

export class ExpenseModalComponent {
  openModal(): void {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  closeModal(): void {
    const modalElement = document.querySelector('.modal') as HTMLElement;
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
}
