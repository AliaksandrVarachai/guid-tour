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
    };
  // TODO: remove direct change of store
  if (!tourStep.htmlContent.replace(/<((?!img|iframe)[^">]*(?:"[^"]+")*[^>]*)>|&nbsp;|\s/g, ''))
  /* 
  delete all html tags except 'img' and 'iframe' (text between tags is left), 
  delete &nbsp; (all spaced in RTE converted to '&nbsp;') ; 
  and any spaces that could be inserted in textarea in htmlEditor
  this comparison returns true if after deletion nothing is left.
  */  
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
