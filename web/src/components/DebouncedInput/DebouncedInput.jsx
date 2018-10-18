import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import { Input } from 'react-toolbox/lib/input';

export default class DebouncedInput extends PureComponent {
  static propTypes = {
    component: PropTypes.instanceOf(Component),
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any,
    onChange: PropTypes.func,
    wait: PropTypes.number,
  };

  static defaultProps = {
    component: null,
    value: '',
    onChange: () => {},
    wait: 400,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      value: nextProps.value,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.onChangeProp = debounce((value, e) => {
      props.onChange(value, e);
    }, props.wait);
  }

  onChange = (value, e) => {
    this.setState({ value });
    this.onChangeProp(value, e.nativeEvent);
  }

  render() {
    const { component } = this.props;
    const { value } = this.state;

    const Comp = component || Input;

    return (
      <Comp
        {...this.props}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}
