import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/core/Models';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  public newEvent: Event = new Event();

  @Output() public eventToCreate: EventEmitter<Event> = new EventEmitter();

  addEventForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    hour: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('',[Validators.required]),
    tickets: new FormControl('', [Validators.required])
  })

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
  }

  public createEvent() {
    this.eventToCreate.emit(this.newEvent);
  }

  isValidField(field: string): boolean | null {
    return this.addEventForm.controls[field].errors && this.addEventForm.controls[field].touched;
  }

}
