import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import Accordion from '../../components/Accordion/Accordion';
import TargetPage from '../../components/Targets/Page';
import TargetVisual from '../../components/Targets/Visual';

// TODO: Replace with a document scan
import documentData from '../../../mocked-data/document-data'

import './SE_StepTarget.pcss';

// TODO: move to separate component
function Pages({ pages, selectedId }) {
  return (
    <div>
      <div styleName="action-container">
        <input type="text" placeholder="Custom page id"/>
        <button>Add</button>
      </div>
      {Object.keys(pages).map(pageId => (
        <TargetPage title={pages[pageId].title}
                    // styleName={pageId === selectedId ? 'selected-page' : null}
                    key={pageId} />
      ))}
    </div>
  )
}

// TODO: move to separate component
function Visuals({ visuals, selectedId }) {
  return (
    <div>
      <div styleName="action-container">
        <input type="text" placeholder="Custom target id" />
        <button>Add</button>
      </div>
      {Object.keys(visuals).map(visualId => (
        <TargetPage title={visuals[visualId].title}
                    // styleName={visualId === selectedId ? 'selected-visual' : null}
                    key={visualId} />
      ))}
    </div>
  )
}

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

    let items = [
      {
        label: 'Select page',
        content: Pages,
        contentProps: {
          pages: documentData.pages,
          selectedId: props.pageId
        }
      },
      {
        label: 'Select visual',
        content: Visuals,
        contentProps: {
          visuals: documentData.pages[props.pageId].visuals,
          selectedId: props.visualId
        }
      }
    ];

    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="text-editor">
            <RichTextEditor value={content} />
          </div>
        </div>
        <div styleName="settings-container">
          <Accordion items={items} />
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
