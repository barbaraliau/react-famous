import RenderNode from 'famous/core/RenderNode';
import GridLayout from 'famous/views/GridLayout';
import toPlainObject from 'lodash/lang/toPlainObject';
import React from 'react';
import cloneWithProps from 'react/lib/cloneWithProps';

import FamousMixin from '../lib/FamousMixin';
import FamousUtil from '../lib/FamousUtil';

export default React.createClass({
  mixins: [FamousMixin],

  propTypes: {
    dimensions: React.PropTypes.array,
    gutterSize: React.PropTypes.array,
    transition: React.PropTypes.bool
  },

  famousCreate() {
    let gridLayout = new GridLayout(this.props.options);
    this.setFamous(gridLayout);
    this.setFamousNode(FamousUtil.getFamousParentNode(this).add(gridLayout));

    let sequence = this.props.children.map(() => new RenderNode());
    gridLayout.sequenceFrom(sequence);
    this.setFamousKeyedNodes(toPlainObject(sequence));
  },

  famousUpdate(nextProps) {
    let gridLayout = this.getFamous();

    gridLayout.setOptions(nextProps.options);
  },

  render() {
    if (!this.getFamousReady()) { return null; }

    return (
      <div data-famous="GridLayout">
        {this.props.children.map((child, key) => cloneWithProps(child, {key}))}
      </div>
    );
  }
});
