import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { ContactCardComponent } from '../contact-card/contact-card.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contacts = computed(() => this.contactService.getContacts()());

  constructor(private contactService: ContactService) {}

  onDelete(id: number) {
    this.contactService.deleteContact(id);
  }
}
