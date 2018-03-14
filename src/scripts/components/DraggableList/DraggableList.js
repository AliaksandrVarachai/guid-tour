import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as actions from '../../actions';

import './DraggableList.pcss';

const noop = () => {};

class DraggedList extends React.Component {
  static propTypes = {
    showHeader: PropTypes.bool.isRequired,
    showFooter: PropTypes.bool.isRequired,
    children: function(props) {
      const childrenNumber = React.Children.count(props.children);
      if (childrenNumber < 2)
        throw Error('Children must contain at least header and footer components');
      React.Children.forEach(props.children, (child, inx) => {
        if (0 < inx && inx < childrenNumber - 1 && !child.props.id)
          throw Error('Every child except of header and footer must have id property');
      });
    },
    orderHandler: PropTypes.func.isRequired,
    isDraggableModeAllowed: PropTypes.bool.isRequired,
    startDraggableMode: PropTypes.func.isRequired,
    stopDraggableMode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { header, footer, items } = this.classifyChildren(props.children);
    this.state = {
      header,
      footer,
      items,
      backupItems: items, // for cancel
      isDraggableMode: false,
      // TODO: rename Node to Item
      draggedNodeIndex: -1,
      dropzoneNodeIndex: -1,
      isDraggedMaskActive: false,
    };
  }

  classifyChildren(children) {
    const childrenNumber = React.Children.count(children);
    let header = {content: null};
    let footer = {content: null};
    const items = [];
    React.Children.forEach(children, (child, inx) => {
      if (inx === 0) {
        header.content = child;
      } else if (inx === childrenNumber - 1) {
        footer.content = child;
      } else {
        items.push({
          content: child,
          originalIndex: inx - 1
        });
      }
    });
    return {
      header,
      footer,
      items
    }
  }

  isReordered = () => {
    const { items } = this.state;
    for (let i = 1; i < items.length; i++)
      if (items[i - 1].originalIndex > items[i].originalIndex)
        return true;
    return false;
  };

  changeDraggableModeHandler = (event) => {
    if (!this.props.isDraggableModeAllowed) {
      this.props.showMessage('You cannot go to drag-and-drop mode while the previous changes are not saved', 'warning');
    } else if (this.isReordered()) {
      this.props.showMessage('You cannot change drag-and-drop mode before applying a new order', 'warning');
    } else {
      const isDraggableMode = event.target.checked;
      if (isDraggableMode) {
        this.props.startDraggableMode();
      } else {
        this.props.stopDraggableMode();
      }
      this.setState({
        isDraggableMode
      });
    }
  };

  dragStartHandler = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    this.setState({
      draggedNodeIndex: +event.target.getAttribute('data-index'),
      isDraggedMaskActive: true
    });
  };

  dragEndHandler = (event) => {
    this.setState({
      draggedNodeIndex: -1,
      isDraggedMaskActive: false
    });
  };

  dragEnterHandler = (event) => {
    event.preventDefault();
    const indexAttr = event.target.getAttribute('data-index');
    if (!indexAttr)
      return;
    const dropzoneNodeIndex = +indexAttr;
    if (dropzoneNodeIndex === this.state.draggedNodeIndex)
      return;
    this.setState({
      dropzoneNodeIndex
    });
  };

  dragOverHandler = (event) => {
    event.preventDefault();
  };

  dragLeaveHandler = (event) => {
    event.preventDefault();
    const indexAttr = event.target.getAttribute('data-index');
    if (!indexAttr)
      return;
    const { dropzoneNodeIndex, draggedNodeIndex } = this.state;
    if (dropzoneNodeIndex === draggedNodeIndex || dropzoneNodeIndex !== +indexAttr)
      return;
    this.setState({
      dropzoneNodeIndex: -1
    });
  };

  dropHandler = (event) => {
    const { items, dropzoneNodeIndex, draggedNodeIndex } = this.state;
    if (dropzoneNodeIndex === -1 || !event.target.hasAttribute('data-index') || dropzoneNodeIndex === draggedNodeIndex)
      return;
    this.setState({
      items: items.map((item, inx, array) => {
        if (draggedNodeIndex <= inx && inx <= dropzoneNodeIndex) {
          return inx === dropzoneNodeIndex ? array[draggedNodeIndex] : array[inx + 1];
        } else if (dropzoneNodeIndex <= inx && inx <= draggedNodeIndex) {
          return inx === dropzoneNodeIndex ? array[draggedNodeIndex] : array[inx - 1];
        } else {
          return item;
        }
      }),
      draggedNodeIndex: -1,
      dropzoneNodeIndex: -1,
      isDraggedMaskActive: false
    });
  };

  applyOrderHandler = (event) => {
    const { items } = this.state;
    if (this.isReordered()) {
      this.props.orderHandler(this.state.items.map(item => item.originalIndex)).then(isSuccess => {
        const orderedItems = items.map((item, inx) => ({...item, originalIndex: inx}));
        this.props.stopDraggableMode();
        this.setState({
          isDraggableMode: false,
          items: orderedItems,
          backupItems: orderedItems
        });
      })
    } else {
      this.props.stopDraggableMode();
      this.setState({
        isDraggableMode: false,
      });
    }
  };

  cancelOrderHandler = (event) => {
    if (this.isReordered()) {
      this.setState({
        isDraggableMode: false,
        items: this.state.backupItems
      });
    } else {
      this.setState({
        isDraggableMode: false,
      });
    }
    this.props.stopDraggableMode();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this.setState({...this.classifyChildren(nextProps.children)});
    }
  }

  render() {
    const { showHeader, showFooter } = this.props;
    const { header, footer, items, isDraggableMode, draggedNodeIndex, dropzoneNodeIndex, isDraggedMaskActive } = this.state;
    return (
      <div styleName={classnames('container', {'dnd-mode': isDraggableMode})}
           onDragStart={isDraggableMode ? this.dragStartHandler : noop}
           onDragEnd={isDraggableMode ? this.dragEndHandler : noop}
           onDragEnter={isDraggableMode ? this.dragEnterHandler : noop}
           onDragOver={isDraggableMode ? this.dragOverHandler : noop}
           onDragLeave={isDraggableMode ? this.dragLeaveHandler : noop}
           onDrop={isDraggableMode ? this.dropHandler : noop}>
        <div styleName={classnames('header', {hidden: !showHeader})}>
          <div styleName="dashboard">
            <label styleName="dashboard-left">
              <span styleName="dnd-mode-title">Reorder mode</span>
              <span styleName="dnd-mode-switcher">
                <input type="checkbox" checked={isDraggableMode} onChange={this.changeDraggableModeHandler}/>
              <span className="gtm__slider gtm__round"/>
              </span>
            </label>
            <span styleName="dashboard-right">
              <span styleName="order-action" data-tooltip="Apply order">
                <i className="material-icons" styleName={classnames({hidden: !isDraggableMode})} onClick={this.applyOrderHandler}>done</i>
              </span>
              <span styleName="order-action" data-tooltip="Cancel order">
                <i className="material-icons" styleName={classnames({hidden: !isDraggableMode})} onClick={this.cancelOrderHandler}>block</i>
              </span>
            </span>
          </div>
          {header.content}
        </div>
        {items.map((item, inx) => (
          <div styleName="content" key={item.content.props.id}>
            <div styleName={classnames(
              'dropzone-before',
              {'visible': inx === dropzoneNodeIndex && draggedNodeIndex > inx}
            )} />
            <div draggable={isDraggableMode}
                 styleName={classnames(
                   'item', {
                     'dragged': draggedNodeIndex === inx,
                     'dragged-mask': isDraggedMaskActive,
                   }
                 )}
                 data-index={inx}>
              {item.content}
            </div>
            <div styleName={classnames(
              'dropzone-after',
              {'visible': inx === dropzoneNodeIndex && draggedNodeIndex < inx}
            )} />
          </div>
        ))}
        <div styleName={classnames('footer', {hidden: !showFooter})}>
          {footer.content}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showMessage: (...args) => dispatch(actions.showMessage(...args)),
  }
};

export default connect(null, mapDispatchToProps)(DraggedList);
