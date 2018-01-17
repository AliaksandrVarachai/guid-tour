import mergeCustomFields from '../helpers/merge-custom-fields';
import {
  TOUR_ID,
  TOUR_STEP_ID,
  GUIDE_ID,
  STYLE_ID
} from '../helpers/default-settings';

const requiredFields = {
  id: TOUR_STEP_ID,
  name: '',
  pageTitle: '',
  height: 300,
  width: 300,
  measuredWidth: 300,
  measuredHeight: 300,
  htmlContent: '',
  startUpScript: '',
  index: 0,
  pageId: '',
  orientation: 0,
  tourId: TOUR_ID,
  targetId: '',
  visualId: '',
  targetType: '',
  customStyle: '',
  guideId: GUIDE_ID,
  title: '',
  styleId: STYLE_ID,
  customTargetId: '',
  subVisuals: {},
  validation: {},
  isToolTip: true
};

/**
 * Provides tour's step object with all required fields.
 * @param {object} tourStep - origin tour step.
 * @returns {object} - new tour step object with filled required fields.
 */
export default function createTourStep(tourStep) {
  return mergeCustomFields(requiredFields, tourStep);
}
