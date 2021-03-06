import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// imports from material-ui
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// relative imports
import { handleAddQuestion } from '../actions/questions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class AddQuestion extends React.Component {
  static propTypes = {
    // from connect
    dispatch: PropTypes.func.isRequired,
    // from material-ui
    classes: PropTypes.object.isRequired,
  };

  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  };

  handleChangeOneText = (e) => {
    const optionOneText = e.target.value;
    this.setState(() => ({
      optionOneText,
    }));
  }

  handleChangeTwoText = (e) => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText,
    }));
  }

  handleSubmit = (e) => {
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;
    e.preventDefault();
    if (optionOneText && optionTwoText) {
      dispatch(handleAddQuestion(optionOneText, optionTwoText));
    }
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    }));
  }

  render() {
    const { classes } = this.props;
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Typography
            style={{ marginTop: 20 }}
            variant="display1"
          >
            Add a New Question
          </Typography>
          <Typography
            style={{ marginTop: 20 }}
            variant="body1"
          >
            {'Would You Rather 🤔'}
          </Typography>
        </div>
        <form
          className={classes.container}
          onSubmit={this.handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div style={{ textAlign: 'center' }}>
            <TextField
              id="option-one"
              label="Option One"
              placeholder=""
              multiline
              fullWidth
              rowsMax="4"
              value={optionOneText}
              onChange={this.handleChangeOneText}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="option-two"
              label="Option Two"
              placeholder=""
              multiline
              fullWidth
              rowsMax="4"
              value={optionTwoText}
              onChange={this.handleChangeTwoText}
              className={classes.textField}
              margin="normal"
            />
          </div>
          <Button
            style={{ marginTop: 30 }}
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.button}
            type="submit"
            disabled={optionOneText === '' || optionTwoText === ''}
          >
            Add Question
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(connect()(AddQuestion));
