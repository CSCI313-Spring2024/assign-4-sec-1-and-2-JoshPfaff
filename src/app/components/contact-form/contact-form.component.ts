import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.contactId;

    const contact = this.isEdit
      ? this.contactService.getContactById(this.contactId)
      : null;

    this.form = this.fb.group({
      fName: [contact?.fName || '', Validators.required],
      lName: [contact?.lName || '', Validators.required],
      phoneNumber: [contact?.phoneNumber || '', Validators.required],
      email: [contact?.email || '', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    if (this.isEdit) {
      const contact: Contact = { id: this.contactId, ...this.form.value };
      this.contactService.updateContact(contact);
    } else {
      this.contactService.addContact(this.form.value);
    }

    this.router.navigate(['/contacts']);
  }
}
