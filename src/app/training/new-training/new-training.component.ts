// import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // @Output() trainingStart = new EventEmitter<void>();
  // with Output we make this listenable event to which we can listen from the outside
  // we no longer listen to this event emitter, instead we're using the TrainingService for this

  exercises: Exercise[] = [];
  // exercises property that is empty initially but where we store the exercies from our TrainingService

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
    // when this component is initialized get the exercises from the TrainingService and store them in exercises so we can show them in our template file dynamically
  }

  onStartTraining(form: NgForm) {
    // this.trainingStart.emit();
    // we emit an event whenever we click on the start training button, so all we have to do now is listen to trainingStart back in our TrainingComponent html file in the app-new-training selector
    // we no longer listen to this event emitter, instead we're using the TrainingService for this

    this.trainingService.startExercise(form.value.exercise);
  }
  // out goal is to emit a custom event in our HeaderComponent to which we can listen from our TrainingComponent (in our app-new-training selector) which then we can use to call toggle on the sidenav reference

}
