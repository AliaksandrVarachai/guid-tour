import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import Accordion from '../../components/Accordion/Accordion';
import TargetPage from '../../components/Targets/Page';
import TargetVisual from '../../components/Targets/Visual';

import './SE_StepTarget.pcss';

// TODO: move to separate component
function Pages(props) {
  return (
    <div>
      <div styleName="action-container">
        <input type="text" placeholder="Custom page id"/>
        <button>Add</button>
      </div>
      <TargetPage title="Target page #1"/>
      <TargetPage title="Target page #2"/>
      <TargetPage title="Target page #3"/>
      <TargetPage title="Target page #4"/>
    </div>
  )
}

// TODO: move to separate component
function Visuals(props) {
  return (
    <div>
      <div styleName="action-container">
        <input type="text" placeholder="Custom target id" />
        <button>Add</button>
      </div>
      <TargetVisual title="Visual #1"/>
      <TargetVisual title="Visual #2"/>
      <TargetVisual title="Visual #3"/>
      <TargetVisual title="Visual #4"/>
    </div>
  )
}

class SE_StepTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    }
  }

  // static propTypes = {
  //   details: PropTypes.string.isRequired
  // };

  changeDetailsHandler = (event) => {
    this.setState({details: event.target.value})
  };

  render() {
    const { details } = this.state;

    let items = [
      {label: 'Select page', content: Pages},
      {label: 'Select visual', content: Visuals}
    ];

    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={details} onChange={this.changeDetailsHandler} />
          <div styleName="text-editor">
            <RichTextEditor />
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
  const componentProps = state.COMPONENTS[state.componentName].componentProps;
  const currentTourEditorStepIndex = componentProps.currentTourEditorStepIndex;
  return {
    details: componentProps.tourEditorSteps[currentTourEditorStepIndex].details
  }
};

export default connect(mapStateToProps)(SE_StepTarget)
