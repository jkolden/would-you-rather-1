import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// imports from material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// relative imports
import SmallAvatar from './ui-library/SmallAvatar';
import { handleSetAuthUser } from '../actions/auth';
// styles
import { Login as styles } from '../styles/styles';

class Login extends Component {
  static propTypes = {
    // from connect
    dispatch: PropTypes.func.isRequired,
    // from MapStateToProps
    userDetails: PropTypes.array.isRequired,
    authUser: PropTypes.string,
    // from material-ui
    classes: PropTypes.object.isRequired,
    // from Router
    location: PropTypes.object,
  }

  static defaultProps = {
    authUser: null,
    location: null,
  }

  login = (e, id) => {
    const { dispatch } = this.props;
    dispatch(handleSetAuthUser(id));
  }

  render() {
    const {
      classes,
      userDetails,
      authUser,
      location,
    } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };

    if (authUser !== null) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div className={classes.container}>
        <Typography
          style={{ marginTop: 20 }}
          variant="display1"
        >
          Login
        </Typography>
        <Typography
          style={{ marginTop: 15, textAlign: 'center' }}
          variant="body1"
        >
          Please, select a user to login.
        </Typography>
        <Typography
          style={{ marginTop: 10, textAlign: 'center' }}
          variant="caption"
        >
          {'Only logged users can vote, submit new questions or view leaderboards. Don\'t miss out on all the fun 🎉'}
        </Typography>
        <ul className={classes.feed}>
          {userDetails
            .map(user => (
              <li
                key={user.userName}
                style={{ listStyleType: 'none' }}
                onClick={e => this.login(e, user.userID)}
              >
                <SmallAvatar
                  imageURL={user.imageURL}
                  userName={user.userName}
                />
                <Typography
                  style={{ marginBottom: 10, textAlign: 'center' }}
                  variant="caption"
                  color="default"
                >
                  {user.userName}
                </Typography>
              </li>))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const userDetails = Object.keys(users)
    .map((user) => {
      const tempUserDetails = {
        imageURL: users[user].avatarURL,
        userName: users[user].name,
        userID: users[user].id,
      };
      return (tempUserDetails);
    });
  return {
    userDetails,
    authUser,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
