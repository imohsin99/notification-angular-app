import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../notification.service";
import {SupervisorDTO} from "../SupervisorDTO";
import {NotificationDTO} from "../NotificationDTO";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationForm: FormGroup;
  supervisors: SupervisorDTO[] = [];

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.pattern('^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$')]],
      supervisorDTO: ['', Validators.required]
    });

    this.notificationService.getAllSupervisors().subscribe(
      data => {
        this.supervisors = data;
      },
      error => {
        console.log('Error retrieving supervisors:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.notificationForm.valid);
    console.log(this.notificationForm.value);
    const notification: NotificationDTO = this.notificationForm.value;
    console.log('Notification submitted:', notification);
    this.notificationForm.reset();
  }
}
