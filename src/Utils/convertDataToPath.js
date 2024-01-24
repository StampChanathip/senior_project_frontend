import linkCoor from "../MockData/linkCoor.json";
const convertDataToPath = (mockPath) => {
  const coorData = [];

  mockPath.slice(0, mockPath.length - 1).forEach((i, idx) => {
    coorData.push([mockPath[idx].node, mockPath[idx + 1].node]);
  });

  const pathData = coorData
    .map((i) => {
      const linkNormal = linkCoor.find(
        (x) => x.nodeFrom == i[0] && x.nodeTo == i[1]
      );

      const linkReverse = linkCoor.find(
        (x) => x.nodeFrom == i[1] && x.nodeTo == i[0]
      );
      if (linkNormal) {
        return linkNormal.coordinates;
      } else if (linkReverse) {
        return [...linkReverse.coordinates].reverse();
      }
    })
    .flat(1)
    .map((i, idx) => {
      return { id: idx, lat: i[1], lng: i[0] };
    });

  const areEqual = (obj1, obj2) => {
    return obj1.lat === obj2.lat || obj2.lat === obj2.lng;
  };

  const removeConsecutiveDuplicates = (arr) => {
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

  return removeConsecutiveDuplicates(pathData);
};

export default convertDataToPath;
