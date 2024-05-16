export function findCarbyTime(entireObj, valToFind) {
  return entireObj.filter((obj) => obj.properties["time"] === valToFind);
}

export function findCarbyPosition(entireObj, valToFind) {
  return Object.entries(entireObj)
    .map((i) => i[1])
    .filter(
      (obj) =>
        obj.position[0] === valToFind[1] && obj.position[1] === valToFind[0]
    );
}
