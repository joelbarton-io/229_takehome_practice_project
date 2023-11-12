const _ = function lodash(source) {
  const p = console.log;

  const allPropsMatch = function allPropsMatch(target, targetKeys, obj) {
    return targetKeys.every((key) => (key in obj) && target[key] === obj[key]);
  };

  return {
    first() {
      return source[0];
    },
    last() {
      return source[source.length - 1];
    },
    without(...args) {
      const noNoValues = new Set(args);
      return source.filter((el) => !noNoValues.has(el));
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
      for (let index = source.length - 1; index >= 0; index -= 1) {
        if (source[index] === searchItem) return index;
      }
      return -1;
    },
    sample(total = 1) {
      if (!source.length || total < 1) throw new Error('source length or total was 0!');
      if (total !== 1 && source.length <= total) return source;

      const randomIndex = (items) => (Math.random() * (items.length - 1)).toFixed();
      const copy = [...source];
      const samples = [];

      for (let n = 0; n < total; n += 1) {
        const idx = randomIndex(copy);
        const item = copy.splice(idx, 1).at(0);
        samples.push(item);
      }

      return total === 1 ? samples[0] : samples;
    },
    findWhere(target) {
      // eslint-disable-next-line no-restricted-syntax
      for (const sourceObj of source) {
        if (allPropsMatch(target, Object.keys(target), sourceObj)) return sourceObj;
      }
      return undefined;
    },
    where(target) {
      return source.filter((sourceObj) => allPropsMatch(target, Object.keys(target), sourceObj));
    },
    pluck(targetKey) {
      return source.reduce((result, item) => {
        if (Object.prototype.hasOwnProperty.call(item, targetKey)) {
          const value = item[targetKey];
          result.push(value);
        }
        return result;
      }, []);
    },
    keys() {
      return Object.getOwnPropertyNames(source);
    },
    values() {
      const keys = _(source).keys(); // reuse keys
      const { length } = keys;
      const values = Array(length);
      for (let i = 0; i < length; i += 1) {
        values[i] = source[keys[i]];
      }
      return values;
    },
    extend(...objects) {
      const result = objects.shift();
      while (objects.length) {
        const curr = objects.pop();
        const currKeys = _(curr).keys();
        currKeys.forEach((key) => {
          result[key] = curr[key];
        });
      }

      return result;
    },
    pick(...selectedKeys) {
      return selectedKeys.reduce((result, key) => {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          // strange that eslint doesn't recognize this creates a property on an object...
          // eslint-disable-next-line no-param-reassign
          result[key] = source[key];
        }
        return result;
      }, {});
    },
    omit(...excludedKeys) {
      return excludedKeys.reduce((result, key) => {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          // eslint-disable-next-line no-param-reassign
          delete result[key];
        }
        return result;
      }, source);
    },
    has(someKey) {
      return Object.prototype.hasOwnProperty.call(source, someKey);
    },
    isElement(arg) {

    },
    isArray(arg) {

    },
    isObject(arg) {

    },
    isFunction(arg) {

    },
    isBoolean(arg) {

    },
    isString(arg) {

    },
    isNumber(arg) {

    },
  };
};

