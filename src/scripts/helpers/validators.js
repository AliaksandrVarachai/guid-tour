function validateTour(tour) {
  if(!tour.name)
    return {
      valid: false,
      message: 'Tour tour\'s name is required'
    };
  return {
    valid: true,
    message: ''
  }
}

function validateTourStep(tourStep) {
  if(!tourStep.name)
    return {
      valid: false,
      message: 'Tour step\'s name is required'
    };
  if (!tourStep.name.trim())
    return {
      valid: false,
      message: 'Tour step\'s name cannot be empty'
    }
  if(!tourStep.htmlContent)
    return {
      valid: false,
      message: 'Tour step\'s content is required'
    };
  if(!tourStep.customTargetId || !tourStep.customTargetId)
    return {
      valid: false,
      message: 'Tour step\'s target page and visual are required'
    };
  return {
    valid: true,
    message: ''
  };
}

export {
  validateTour,
  validateTourStep,
}
