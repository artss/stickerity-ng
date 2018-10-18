import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-toolbox/lib/input';
import { Checkbox } from 'react-toolbox/lib/checkbox';
import { Button, IconButton } from 'react-toolbox/lib/button';

import { generate } from '../../../util/password';

import s from './PasswordPage.css';

export default class PasswordGenerationForm extends PureComponent {
  static propTypes = {
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      length: 16,
      lowercase: true,
      uppercase: true,
      numbers: true,
      signs: true,
    };

    this.state.password = generate(this.state);
  }

  generate = () => {
    this.setState(state => ({ password: generate(state) }));
  }

  onLengthChange = (value) => {
    this.setState({ length: Number(value) }, this.generate);
  }

  onChange = (value, e) => {
    const { name } = e.target;
    this.setState({ [name]: value }, this.generate);
  }

  onAccept = () => {
    const { onAccept } = this.props;
    const { password } = this.state;
    onAccept(password);
  }

  render() {
    const { onCancel } = this.props;
    const {
      password,
      length,
      lowercase,
      uppercase,
      numbers,
      signs,
    } = this.state;

    return (
      <div className={s.generationForm}>
        <Input
          type="number"
          label="Length"
          name="length"
          value={length}
          onChange={this.onLengthChange}
        />

        <Checkbox
          label="Lowercase"
          name="lowercase"
          checked={lowercase}
          onChange={this.onChange}
        />

        <Checkbox
          label="Uppercase"
          name="uppercase"
          checked={uppercase}
          onChange={this.onChange}
        />

        <Checkbox
          label="Numbers"
          name="numbers"
          checked={numbers}
          onChange={this.onChange}
        />

        <Checkbox
          label="Signs"
          name="signs"
          checked={signs}
          onChange={this.onChange}
        />

        <div className={s.generatedPasswordWrap}>
          <div className={s.generatedPassword}>{password}</div>
          <IconButton icon="refresh" onClick={this.generate} />
        </div>

        <Button onClick={this.onAccept} raised primary>
          Accept
        </Button>

        <Button onClick={onCancel}>
          Cancel
        </Button>
      </div>
    );
  }
}
