import { fromEvent, scan, startWith } from 'rxjs';

const $event = fromEvent(document.querySelector('#button'), 'click');
$event.pipe(scan(ac => ac + 1, 0), startWith(0)).subscribe((x) => {
  document.querySelector('#count').textContent = String(x);
})
