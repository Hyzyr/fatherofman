export const calcMouseFromCenter = (event) => {
  if (typeof window === 'undefined') return {};

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Find the center of the window
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;
  // Calculate the difference from the center
  const diffX = event.clientX - centerX;
  const diffY = event.clientY - centerY;

  // Calculate the percentage
  const percentageX = (diffX / centerX) * 100;
  const percentageY = (diffY / centerY) * 100;

  return {
    percentageX,
    percentageY,
  };
};
