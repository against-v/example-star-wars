export const getIdFromUrl = (url: string) => {
  const arr = url.split('/');
  return  arr[arr.length - 2];
};
