export const getRandomToN = (n, exclude = null) => {
  if (typeof Math === 'undefined') return 0;
  let random = Math.floor(Math.random() * n);
  return random === exclude ? getRandomToN(n, exclude) : random;
};
