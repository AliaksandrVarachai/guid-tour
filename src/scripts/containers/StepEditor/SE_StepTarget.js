import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import Accordion from '../../components/Accordion/Accordion';
import PageList from '../../components/Accordion/Items/PageList';
import VisualList from '../../components/Accordion/Items/VisualList';
import * as actions from '../../actions';

import './SE_StepTarget.pcss';


class SE_StepTarget extends React.Component {
  constructor(props) {
    super(props);
    const step = props.tours[props.tourIndex].steps[props.tourStepIndex];
    this.state = {
      tourStepName: step.name,
      htmlContent: step.htmlContent,
    };
  }

  changeStateAndDispatch = (propName, value) => {
    this.setState({
      [propName]: value
    });
    this.props.changeTourStep({
      [propName]: value
    });
  };

  changeTourStepNameHandler = (event) => {
    this.changeStateAndDispatch('tourStepName', event.target.value);
  };

  changeRichTextEditorHandler = (event) => {
    this.changeStateAndDispatch('htmlContent', event.toString('html'));
  };

  render() {
    const { tourStepName, htmlContent } = this.state;
    const { targetPages, targetVisuals } = this.props;
    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="text-editor">
            <RichTextEditor value={htmlContent} onChange={this.changeRichTextEditorHandler} />
          </div>
        </div>
        <div styleName="settings-container">
          <Accordion>
            {[
              {
                content: <PageList pages={targetPages} />,
                label: 'Select page'
              }, {
                content: <VisualList visuals={targetVisuals} />,
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
    customTargetId: state.customTargetId,
    targetPages: state.product.pages,
    targetVisuals: state.product.pages[state.product.activePageId].visuals,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTourStep: (...args) => dispatch(actions.changeTourStep(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SE_StepTarget);
