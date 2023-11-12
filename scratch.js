// const { random } = require("underscore");

const element = ['a', 'b', 'c', 'd', 'e'];

function sample(total = 1) {
  /*
  - make copy of element
  - if copy length <= total, return element
  - otherwise, do sampling using dynamic copy length
  */
  if (!element.length || total < 1) throw new Error('element length or total was 0!');
  if (element.length <= total) return element;

  const random = (items) => (Math.random() * (items.length - 1)).toFixed();
  const copy = [...element];

  const samples = [];
  for (let n = 0; n < total; n += 1) {
    const idx = random(copy); // get index
    const item = copy.splice(idx, 1).at(0); // mutate copy
    console.log(item);
    samples.push(item); // push item into samples
  }

  return total === 1 ? samples[0] : samples;
}
console.log(sample());
/*
- get length of array
- based on this length, need to select a (random) number between 0 and the length - 1
- get random is th
*/