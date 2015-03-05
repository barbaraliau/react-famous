import Surface from 'famous/core/Surface';
import isUndefined from 'lodash/lang/isUndefined';
import React from 'react';

import FamousMixin from '../lib/FamousMixin';
import FamousUtil from '../lib/FamousUtil';

const SURFACE_EVENTS = [
  {prop: 'onClick', type: 'click'},
  {prop: 'onKeyDown', type: 'keydown'},
  {prop: 'onKeyPress', type: 'keypress'},
  {prop: 'onKeyUp', type: 'keyup'},
  {prop: 'onMouseDown', type: 'mousedown'},
  {prop: 'onMouseMove', type: 'mousemove'},
  {prop: 'onMouseOut', type: 'mouseout'},
  {prop: 'onMouseOver', type: 'mouseover'},
  {prop: 'onMouseUp', type: 'mouseup'},
  {prop: 'onTouchCancel', type: 'touchcancel'},
  {prop: 'onTouchEnd', type: 'touchend'},
  {prop: 'onTouchMove', type: 'touchmove'},
  {prop: 'onTouchStart', type: 'touchstart'}
];

export default React.createClass({
  mixins: [FamousMixin],

  propTypes: {
    eventKey: React.PropTypes.any,
    onClick: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseMove: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchCancel: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchMove: React.PropTypes.func,
    onTouchStart: React.PropTypes.func
  },

  famousCreate() {
    let surface = new Surface(this.props.options);
    this.setFamous(surface);
    this.setFamousNode(this.getFamousParentNode().add(surface));

    SURFACE_EVENTS.forEach((event) => {
      if (this.props[event.prop]) {
        surface.on(event.type, () => {
          this.props[event.prop](this.props.eventKey);
        });
      }
    });

    if (!isUndefined(this.props.children)) {
      surface.setContent(FamousUtil.renderContent(this.props.children));
    }
  },

  famousUpdate(nextProps) {
    let surface = this.getFamous();

    surface.setOptions(nextProps.options);

    if (!isUndefined(nextProps.children)) {
      surface.setContent(FamousUtil.renderContent(nextProps.children));
    }
  },

  render() {
    if (!this.getFamousReady()) { return null; }

    return (
      <div data-famous="Surface">
        {this.props.children}
      </div>
    );
  }
});
