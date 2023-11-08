import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from 'src/app/core/Models';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

  public newEvent: Event = new Event({id: null});

  @Output() public eventToCreate: EventEmitter<Event> = new EventEmitter();

  addEventForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    hour: new FormControl(null, [Validators.required]),
    place: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    image: new FormControl('',[Validators.required]),
    tickets: new FormControl(0, [Validators.required])
  })

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
  }

  public onSubmit() {
    this.newEvent.name = this.addEventForm.value.name;
    this.newEvent.date = this.addEventForm.value.date;
    this.newEvent.hour = this.addEventForm.value.hour;
    this.newEvent.place = this.addEventForm.value.place;
    this.newEvent.description = this.addEventForm.value.description;
    this.newEvent.category = this.addEventForm.value.category;
    this.newEvent.image = this.addEventForm.value.image;
    this.newEvent.tickets = this.addEventForm.value.tickets;

    this.createEvent();
  }

  public createEvent() {
    this.eventToCreate.emit(this.newEvent);
  }

  isValidField(field: string): boolean | null {
    return this.addEventForm.controls[field].errors && this.addEventForm.controls[field].touched;
  }

}
