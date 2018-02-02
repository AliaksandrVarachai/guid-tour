/**
 * Checks if a tour is synchronized with DB.
 * @param tour - tour to be checked.
 * @returns {boolean} - true if tour is synchronized or false otherwise.
 */
function isTourSynchronized(tour) {
  const steps = tour.steps;
  for (let i = 0; i < steps.length; i++)
    if (!steps[i].isSynchronized || steps[i].isNew)
      return false;
  return true;
}

export {
  isTourSynchronized,
}


