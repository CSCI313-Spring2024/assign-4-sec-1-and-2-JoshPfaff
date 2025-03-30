import { Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private nextId = 3;

  private contacts = signal<Contact[]>([
    {
      id: 1,
      fName: 'John',
      lName: 'Adams',
      phoneNumber: '701-000-1000',
      email: 'john@example.com',
    },
    {
      id: 2,
      fName: 'Mary',
      lName: 'Jane',
      phoneNumber: '701-000-2000',
      email: 'mary@example.com',
    },
  ]);

  getContacts = () => this.contacts.asReadonly();

  addContact(contact: Omit<Contact, 'id'>) {
    const newContact: Contact = { id: this.nextId++, ...contact };
    this.contacts.update((c) => [...c, newContact]);
  }

  updateContact(updated: Contact) {
    this.contacts.update((c) =>
      c.map((c) => (c.id === updated.id ? updated : c))
    );
  }

  deleteContact(id: number) {
    this.contacts.update((c) => c.filter((c) => c.id !== id));
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts().find((c) => c.id === id);
  }
}
