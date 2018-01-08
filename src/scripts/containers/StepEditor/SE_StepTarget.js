import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import Accordion from '../../components/Accordion/Accordion';
import PageList from '../../components/Accordion/Items/PageList';
import VisualList from '../../components/Accordion/Items/VisualList';

// TODO: Replace with a document scan
//import documentData from '../../../mocked-data/document-data'
import documentData from '../../helpers/document-parsing';

import './SE_StepTarget.pcss';

class SE_StepTarget extends React.Component {
  constructor(props) {
    super(props);
    const step = props.tours[props.tourIndex].steps[props.tourStepIndex];
    this.state = {
      tourStepName: step.tourStepName,
      content: step.content,
    };
  }

  changeStateAndDispatch = (propName, value) => {
    this.setState({
      [propName]: value
    });
    this.props.dispatch({
      type: 'CHANGE_TOUR_STEP',
      propName,
      value
    });
  };

  changeTourStepNameHandler = (event) => {
    this.changeStateAndDispatch('tourStepName', event.target.value);
  };

  render() {
    const { tourStepName, content } = this.state;
    const props = this.props;

    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="text-editor">
            <RichTextEditor value={content} />
          </div>
        </div>
        <div styleName="settings-container">
          <Accordion>
            {[
              {
                content: <PageList pages={documentData.pages} />,
                label: 'Select page'
              }, {
                content: <VisualList visuals={documentData.visuals} />,
                label: 'Select visual'
              }
            ]}
          </Accordion>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours,
    tourIndex: state.tourIndex,
    tourStepIndex: state.tourStepIndex,
    stepEditorIndex: state.stepEditorIndex,
    pageId: state.pageId,
    visualId: state.visualId
  }
};

export default connect(mapStateToProps)(SE_StepTarget)
