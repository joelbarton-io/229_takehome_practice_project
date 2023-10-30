const _ = function (element) {
  const p = console.log;

  return {
    first() {
      return element[0];
    },
    last() {
      return element[element.length - 1];
    },
    without(...args) {
      const noNoValues = new Set(args);
      return element.filter((el) => !noNoValues.has(el));
    },
    range(...args) {
      // why can't we use `this` here? ->   _().method()   vs   this().method()
      const addNumberToArr = function addNumberToArr(arr, last) {
        const finished = _(arr).last() + 1 === last;

        if (finished) return arr;

        arr.push(_(arr).last() + 1);
        return addNumberToArr(arr, last);
      };

      if (args.length > 1) {
        return addNumberToArr([_(args).first()], _(args).last());
      }
      return addNumberToArr([0], _(args).first());
    },
    lastIndexOf(searchItem) {
      for (let index = element.length - 1; index >= 0; index -= 1) {
        if (element[index] === searchItem) return index;
      }
      return -1;
    },
    sample(count) {
      const random = function random(items) {

      };

      if (!arguments.length) {
        // get random
      } else {
        const samples = [];
        // get random `count` times from element
      }
    },
  };
};
/*

*/
