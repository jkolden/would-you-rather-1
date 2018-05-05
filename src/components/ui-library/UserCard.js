import React, { Component } from 'react';
import PropTypes from 'prop-types';
// imports from material-ui
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import ModeComment from '@material-ui/icons/ModeComment';
import ReplyAll from '@material-ui/icons/ReplyAll';

const styles = {
  card: {
    marginTop: 15,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

class UserCard extends Component {
  static propTypes = {
    // from material-ui
    classes: PropTypes.object.isRequired,
    // from Leaderboard
    imageURL: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    questionsAnswered: PropTypes.number.isRequired,
    questionsPosted: PropTypes.number.isRequired,
  };

  render() {
    const {
      classes,
      imageURL,
      userName,
      questionsAnswered,
      questionsPosted,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={userName}
        />
        <CardContent>
          <Typography
            style={{ marginBottom: 15 }}
            gutterBottom
            variant="headline"
            component="h2"
          >
            {userName}
          </Typography>

          <Typography component="p">
            <ModeComment
              style={{ width: 17, margin: '0 15 -7 0' }}
              color="primary"
            />
            Posted {questionsPosted} questions
          </Typography>
          <Typography
            style={{ marginTop: 8 }}
            component="p"
          >
            <ReplyAll
              style={{ width: 20, margin: '0 15 -7 0' }}
              color="primary"
            />
            Responded {questionsAnswered} questions
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(UserCard);