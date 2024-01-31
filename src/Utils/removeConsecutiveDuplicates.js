const removeConsecutiveDuplicates = (arr) => {
  const areEqual = (obj1, obj2) => {
    return obj1.lat === obj2.lat || obj2.lat === obj2.lng;
  };

  const result = [];
  let lastObj;

  for (const obj of arr) {
    if (!lastObj || !areEqual(obj, lastObj)) {
      result.push(obj);
    }
    lastObj = obj;
  }

  return result;
};

export default removeConsecutiveDuplicates;
