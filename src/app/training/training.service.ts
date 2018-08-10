import { Subject } from 'rxjs';
// Subject is essentially the same as an EventEmmiter we could say, and it's an object that allows us to event emit and subscribe to it in other parts of the app
import { Exercise } from "./exercise.model";

export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  // the exercises that are available in our app initially

  private runningExercise: Exercise;
  // this should store the exercise that the user selected, if any
  exerciseChanged = new Subject<Exercise>();
  // Subject is of generic type which means it can hold a payload of different type, and we're going to pass a payload that's going to be of type Exercise, so that whoever is listening knows which exercise was chosen
  private exercises: Exercise[] = [];
  // empty array initially, a property where we store all our completed or cancelled exercises

  getAvailableExercises() {
    return this.availableExercises.slice();
    // the slice() method will create a real copy of the array for the same reason with the reference type problem for objects; it's the same for arrays and by calling slice() we create a new array which can be edited without effecting the old one
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(exercise => exercise.id === selectedId);
    // we find the exercise that the user selected and temporarily store it in the runningExercise (the arrow function is executed on every element (object) in our array and returns true if the exercise.id, the exercise we're currently looking at, is equal to the selectedId, to the id we get passed as an argument, the id of the exercise the user selected)
    this.exerciseChanged.next({...this.runningExercise});
    // whenever the user selects an exercise we want to emit an event and we're passing a copy of the selected exercise
  }
  // we want to call this method from the NewTrainingComponent when we click on the Start button where we set the exercise that the user choose

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise, 
      date: new Date(), 
      state: 'completed'
    });
    // we're storing the still running exercise in the exercises array; with the spread operator we can copy all the properties of the running exercise, and we also want to override, to set the date when we completed the exercise, and the state to 'completed'
    // after that we're setting the running exercise to null
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    // this basically means we got no running exercise
  }
  // success case, we completed the entire duration

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise, 
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(), 
      state: 'cancelled'
    });
    // we're storing the still running exercise in the exercises array; with the spread operator we can copy all the properties of the running exercise, and we also want to override, to set the date when we cancelled the exercise, and the state to 'cancelled'; for cancelled exercises we also want to override the duration of the exercise and the calories we burned, for that we need to get the progress we made as an argument in our function
    // after that we're setting the running exercise to null
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    // this basically means we got no running exercise
  }
  // when we cancel the exercise, and we want to store how much we completed and store the calories that we burned

  getRunningExercise() {
    return {...this.runningExercise};
  }
  // runningExercise is a private property, so with this method we're getting that property, or a copy of it with the spread operator (so we can't mutate it from outside of the service)

  getCompletedOrCancelledExcerices() {
    return this.exercises.slice();
  }
  // because exercises is a private property, getCompletedOrCancelledExcerices() is a helper method that returns all our finished exercises (or a copy of them with the slice() method so we can't mutate them from outside of the service)
}

// this is where we manage all exercises we know, as well as our completed and cancelled exercises