export const getJson = async url => {
  const response = await fetch(url);
  return response.json();
};
