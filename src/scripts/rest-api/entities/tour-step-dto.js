import mergeCustomFields from '../helpers/merge-custom-fields';
import {
  TOUR_ID,
  TOUR_STEP_ID,
  GUIDE_ID
} from '../helpers/default-settings';

const necessaryFields = {
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

export default function TourStepDto(tourStep) {
  Object.assign(this, mergeCustomFields(necessaryFields, tourStep), {
    // TODO: copy subVisuals{} and validation{}  here
  });
}
