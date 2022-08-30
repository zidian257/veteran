import { fromEvent, merge, startWith, map, filter } from 'rxjs';

const tcElem = document.querySelector('#tc');
const tfElem = document.querySelector('#tf');



const $tc = fromEvent(tcElem, 'input').pipe(
  map((c) => ({ ev: c, type: 'c' }))
);
const $tf = fromEvent(tfElem, 'input').pipe(
  map((f) => ({ ev: f, type: 'f' }))
);

const getValue = ({ ev, type }) => ({ v: ev.target.value, type });
const c2f = (C) => C * (9 / 5) + 32;
const f2c = (F) => (F - 32) * (5 / 9);

const $changeEvent = merge($tc, $tf);

$changeEvent.pipe(
  map(getValue),
  filter(({ v }) => !isNaN(v)),
  map(({ v, type }) =>
    type === 'c' ? { c: v, f: c2f(v) } : { c: f2c(v), f: v }
  )
).subscribe(({c, f}) => {
  tcElem.value = Number(c)
  tfElem.value = Number(f)
})

