import { Observable, Subject } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';


console.clear();

const o1 = new Observable<number>(observer => {
 let counter = 0;
 const eventClickListener = () => {
   counter++;
   console.log('emitting event');
   observer.next(counter);
 };
 const errorClickListener = () => {
   console.log('emitting errorDetail')
   observer.error('Hiba történt');
 };
 const completionClickListener = () => {
   observer.complete();
 };
 document.querySelector('#event-square').addEventListener('click', eventClickListener);
 document.querySelector('#error').addEventListener('click', errorClickListener);
 document.querySelector('#completion').addEventListener('click', completionClickListener);

 return () => {
   document.querySelector('#event-square').removeEventListener('click', eventClickListener);
   document.querySelector('#error').removeEventListener('click', errorClickListener);
   document.querySelector('#completion').removeEventListener('click', completionClickListener);
 }
}).pipe(
 tap(e => console.log('Console log from tap', e)),
 map(e => e + 1)
);

const s = new Subject<number>();

o1.subscribe(s);

const subscription = s.pipe(filter(e => (e % 2) === 0)).subscribe(
 res => {
   console.log('Observable emits:', res);
   if (res === 5) {
     subscription.unsubscribe();
   }
 },
 err => console.error(err),
 () => console.log('Completed')
);

const sub2 = s.subscribe(
  res => console.log('Observable result:', res),
  res => res.length > 120
);
