export const removeData = (
  collection: any[] = [],
  value: any,
  key: string = 'id'
) => {
  const collectionValue = [...collection];
  for (let index = 0; index < collectionValue.length; index++) {
    if (collectionValue[index]?.[key] === value) {
      collectionValue.splice(index, 1);
      break;
    }
  }
  return collectionValue;
};
