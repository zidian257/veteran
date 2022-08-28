# Observables

lazy push collection of multiple values.

## Pull vs push systems:

JavaScript Functions
- 函数代码本身是 producer
- 函数的调用者是 consumer
- 函数符合 Pull System
- consumer 来决定何时消费数据

JavaScript 迭代器也是 Pull System
- 迭代器本身是 producer
- 调用`iterator.next()`的是 consumer

JavaScript Promise 是 Push System
- promise 作为 producer，本身决定何时将结果推给 consumer
- promise 注册的回调是 consumer
- consumer 并不知道接受数据的时间

RxJs 的 Observable 是 Push System
- Observable 将 0 个或多个值推给 Observer
- 是一个 lazy evaluated computation

## Observable 是归一化的函数

"calling" or "subscribing" is an isolated operation: two function calls trigger two separate side effects, and two Observable subscribes trigger two separate side effects.

observables deliver value 可以是同步也可以是异步的。

- func.call() means "give me one value synchronously"
- observable.subscribe() means "give me any amount of values, either synchronously or asynchronously"

# Observer

Observer 作为消费者、消费 Observable 投递的一系列值。Observer 只是几个 callback。

```javascript
const observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
```
如果只填入一个函数，

`observable.subscribe(x => console.log('Observer got a next value: ' + x)`

则会作为 next handler 来调用。

# Operators

操作符是 RxJS 起作用的关键，尽管 Observable 是 RxJS 的基础。

操作符使得复杂的异步代码可以声明式的写出来。

操作符都是函数。


## Pipeable Operators

管道操作符以一个 `Observable` 作为参数，返回一个新的 `Observable`，不改变原有的 `Observable`。

管道操作符都是纯函数；事实上你是可以 `op()(obs)` 来使用管道操作符的。但是这样可读性太差了。所以 `Observable` 有一个 `obs.pipe()` 方法，在这里面传入管道操作符函数 `obs.pipe(op1(), op2(), op3())`。 

## Creation Operators

顾名思义，可以产生新的 `Observable` 的操作符。例如 `interval`。

## Higher-order Observables

Observable 不仅仅可以吐出值（字符串、数字），也可以吐出别的 Observable。

```javascript
const fileObservable = urlObservable.pipe(
  map((url) => http.get(url)),
  concatAll()
);
```

这里 `concatAll` 的作用是，订阅到每个吐出来的内层 Observable，在这个 Observable 完毕前，将所有的值拷贝出来，然后对下一个 observable 做此操作；这样一来，所有内层 observable 吐出来的 value 都被联结了起来。

- mergeAll: subscribes to each inner Observable as it arrives, then emits each value as it arrives
- switchAll: subscribes to the first inner Observable when it arrives, and emits each value as it arrives, but when the next inner Observable arrives, unsubscribes to the previous one, and subscribes to the new one.
- exhaustAll: subscribes to the first inner Observable when it arrives, and emits each value as it arrives, discarding all newly arriving inner Observables until that first one completes, then waits for the next inner Observable.

## 弹珠图

Marble Diagrams

- 箭头的方向表示时间的方向
- 弹珠从左到右标识值被吐出的时序
- 竖线表示中止
- 

![marble-diagrams](https://rxjs.dev/assets/images/guide/marble-diagram-anatomy.svg)

# Subscription
todo

# Subjects

Subject 是一种特殊的 Observable，可以让值被 multicast 而不是 unicast(each subscribed Observer owns an independent execution of the Observable)。

## Observable VS Subject

解释一下 Observable 和 Subject 的区别，也就是 multicast 和 unicast 的区别。
```javascript
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

let final_val = ajax('https://jsonplaceholder.typicode.com/users').pipe(map(e => e.response));
let subscriber1 = final_val.subscribe(a => console.log(a));
let subscriber2 = final_val.subscribe(a => console.log(a));

```
以 ajax 操作符为例，生成一个 observable；上面的代码是「但凡出现了订阅行为，Observable 就会重新吐一遍值」。下图是这个运行的结果。

![result](https://www.tutorialspoint.com/rxjs/images/observable.jpg)

我们想要数据只请求一次，但是返回值可以被分享，如果使用一个 Observable，那么请求行为（也就是 Observable 的执行）会发生 2 次。

如果是 Subject 的话：

```javascript
import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

const subject_test = new Subject();

subject_test.subscribe({
   next: (v) => console.log(v)
});
subject_test.subscribe({
   next: (v) => console.log(v)
});

// 这里在暗示 final_val 代表着一个 lazy 的过程；subscribe 调用意味着过程的执行
let final_val = ajax('https://jsonplaceholder.typicode.com/users').pipe(map(e => e.response));
let subscriber = final_val.subscribe(subject_test);
```
看下结果：

![result](https://www.tutorialspoint.com/rxjs/images/observable_possible.jpg)

很明显，请求只发了一次，值依然被 share 了出来。

## BehaviorSubject

BehaviorSubject 是 Subject 的一个变种；它储存最新的「吐给消费者的值」，并且当被订阅时，它会把「当前的值」吐给这个订阅者。

```javascript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(3);

// Logs
// observerA: 0
// observerA: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3
```
可以看到，新的订阅发生的时候，消费行为立刻发生、且消费了最新的值。

## Subject VS BehaviorSubject

```javascript

import { Subject } from 'rxjs';
const subject = new Subject(0); // initial value do not work for subject

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
});

subject.next(3);

// Logs
// observerA: 1
// observerA: 2
// observerA: 3
// observerB: 3

```
区别：
- Subject 无法设定初始值，BehaviorSubject 可以
- Subject 的消费者订阅时，Subject 不会 emit 任何值；BehavoirSubject 会 emit 当前的值。


## ReplaySubject


