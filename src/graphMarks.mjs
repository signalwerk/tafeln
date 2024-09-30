export function generateGraphMarks(date) {
  const { min, max } = findMinMax(date);
  const stepSize = getStepSize(min, max);

  console.log("min", min);
  console.log("max", max);
  console.log("stepSize", stepSize);

  return generateBySteps(min, max, getStepSize(min, max));
}

export function findMinMax(data) {
  let flatData = data.flat(Infinity); // Flatten the array of arrays into a single array
  let min = Math.min(...flatData);
  let max = Math.max(...flatData);

  return { min, max };
}

export function generateBySteps(min, max, stepSize) {
  let marks = [];
  for (
    let i = Math.floor(min / stepSize) * stepSize;
    i <= Math.ceil(max / stepSize) * stepSize;
    i += stepSize
  ) {
    marks.push(i);
  }
  return marks;
}

export function getStepSize(min, max) {
  const range = max - min;

  // Determine an appropriate step size based on the range
  const magnitude = Math.floor(Math.log10(range)); // Get the order of magnitude
  const baseStep = Math.pow(10, magnitude - 1); // Calculate a base step (1/10 of the magnitude)

  // Determine the step size, making it round numbers like 10, 20, 50, 100, etc.
  let stepSize;
  if (range / baseStep <= 5) {
    stepSize = baseStep; // e.g., 10, 100, 1000, etc.
  } else if (range / baseStep <= 10) {
    stepSize = baseStep * 2; // e.g., 20, 200, 2000, etc.
  } else if (range / baseStep <= 20) {
    stepSize = baseStep * 5; // e.g., 50, 500, 5000, etc.
  } else {
    stepSize = baseStep * 10; // e.g., 100, 1000, 10000, etc.
  }

  return stepSize;
}
