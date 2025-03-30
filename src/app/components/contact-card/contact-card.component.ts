import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../models/contact.model';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css'],
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router) {}

  edit() {
    this.router.navigate(['/edit', this.contact.id]);
  }

  remove() {
    this.delete.emit(this.contact.id);
  }
}
