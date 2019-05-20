import React, { Component } from 'react'

export default class NumberComponent extends Component {
  constructor(props) {
    super(props)
      this.updateNumber = this.updateNumber.bind(this)
      this.state = {
        maxLength: props.maxLength ? +props.maxLength : 100,
        maxValue: props.maxValue ? +props.maxValue : Number.MAX_VALUE,
        value: props.value || ''
    };
  }

  updateNumber = (e) => {
    const value = +e.target.value;
    if (e.target.validity.valid) {
      console.log(e.target.validity.valid)
      if (value <= this.state.maxValue) {
        this.setState({
          value
        });
        if (this.props.valueUpdated) {
          this.props.valueUpdated(value)
        }
      }
    }

    // If the current val is just the negation sign, or it's been provided an empty string,
    // then apply that value to state - we still have to validate this input before processing
    // it to some other component or data structure, but it frees up our input the way a user
    // would expect to interact with this component
    else if (value === '-') {
      this.setState({
        value
      })
    } else if (value === '') {
      this.setState({
        value
      })
    }
  }

  render() {
    const pattern = `^[0-9]{0,${this.state.maxLength}}$`
    return (
      <input
        type='tel'
        value={this.state.value}
        onChange={this.updateNumber}
        pattern={pattern}
       />
    );
  }
}
