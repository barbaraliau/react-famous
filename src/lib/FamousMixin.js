import isEqual from 'lodash/lang/isEqual';
import isFunction from 'lodash/lang/isFunction';
import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

import FamousNodeMixin from './FamousNodeMixin';
import FamousUtil from './FamousUtil';

export default {
  mixins: [FamousNodeMixin],

  propTypes: {
    onReady: React.PropTypes.func,
    options: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      options: {}
    };
  },

  componentWillMount() {
    this.setFamousReady(false);
  },

  componentDidMount() {
    if (isFunction(this.famousCreate)) {
      this.famousCreate();
    }
    this.setFamousReady(true);
    this.forceUpdate(() => {
      if (this.props.onReady) {
        this.props.onReady();
      }
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !isEqual(this.props.options, nextProps.options);
  },

  componentWillUpdate(nextProps, nextState) {
    if (isFunction(this.famousUpdate)) {
      this.famousUpdate(nextProps, nextState);
    }
  },

  componentWillUnmount() {
    if (isFunction(this.famousDelete)) {
      this.famousDelete();
    }
    this.releaseFamous();
  }
};
