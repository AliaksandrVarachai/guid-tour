function getNextStepIndex(steps) {
  if(steps == null || steps.length == 0) {
    return 1;
  }

  const indexes = steps.map(step => step.index);
  return Math.max.apply(Math, indexes) + 1;
}

function sortStepsByIndex(steps) {
  if (steps == null || steps.length == 0) {
    return steps;
  }

  return steps/*.sort((a, b) => a.index - b.index)*/;
}

export {
	getNextStepIndex,
	sortStepsByIndex
}
