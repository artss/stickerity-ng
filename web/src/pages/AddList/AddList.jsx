import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';

import { addList } from '../../actions/lists';
import Sticker from '../../components/Sticker';
import ListForm from '../../components/ListForm';

import s from './AddList.css';

class AddList extends PureComponent {
  static propTypes = {
    addList: PropTypes.func.isRequired,
  };

  state = {
    $type: '',
    title: '',
  };

  onChange = (name, value) => {
    this.setState(
      { [name]: value },
      () => {
        const { addList: add } = this.props;
        const { $type, title } = this.state;

        if ($type && title) {
          add(this.state);
        }
      }
    );
  }

  render() {
    const { $type, title } = this.state;

    const headTitle = 'Add List';

    return (
      <Sticker
        className={s.root}
        backUrl="/lists"
        title={headTitle}
      >
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <ListForm
          $id=""
          $type={$type}
          title={title}
          onChange={this.onChange}
        />
      </Sticker>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddList);
