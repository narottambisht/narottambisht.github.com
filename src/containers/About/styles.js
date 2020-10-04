import { makeStyles } from '@material-ui/core';

const aboutStyles = makeStyles(theme => ({
  containerGrid: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 1160
    },
    paddingBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

export default aboutStyles;