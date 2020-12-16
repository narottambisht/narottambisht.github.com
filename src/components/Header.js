import lottie                                                            from 'lottie-web';
import { Route, Switch }                                                 from 'react-router-dom';
import React, { useContext, useEffect }                                  from 'react';
import { Typography, Container, Grid, IconButton, CssBaseline, Tooltip } from '@material-ui/core';

import Drawer                                                                           from './Drawer';
import Home                                                                             from '../containers/Home';
import { headerStyles }                                                                 from './style';
import About                                                                            from '../containers/About';
import MyWork                                                                           from '../containers/MyWork';
import ContactMe                                                                        from '../containers/ContactMe';
import { firestoreDB }                                                                  from '../utils/FirebaseConfig';
import { RootContext, PortfolioInfoContext, SocialPartyContext }                        from '../context';
import { MenuIcon, FacebookIcon, TwitterIcon, GitHubIcon, LinkedInIcon, InstagramIcon } from '../utils/MaterialIcons';

const socialIconsArray = [
  <TwitterIcon/>,
  <GitHubIcon/>,
  <LinkedInIcon/>,
  <InstagramIcon/>,
  <FacebookIcon/>
];

const Header = props => {
  const [rootStore, setRootStore]                   = useContext(RootContext);
  const [portfolioInfoStore, setPortfolioInfoStore] = useContext(PortfolioInfoContext);
  const [socialParty, setSocialParty]               = useContext(SocialPartyContext);

  useEffect(() => {
    firestoreDB.collection('portfolio-info').onSnapshot(snapshot => {
      snapshot.docs.map(doc => setPortfolioInfoStore(doc.data()));
    });

    firestoreDB.collection('social-party').onSnapshot(snapshot => {
      setSocialParty(snapshot.docs.map(doc => {
        let social   = doc.data();
        social['id'] = doc.id;
        return social;
      }))
    });

    lottie.loadAnimation({
      container: document.getElementById('lottie'),
      renderer : 'svg',
      loop     : true,
      autoplay : true,
      path     : process.env.PUBLIC_URL + '/images/programming-man.json'
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = headerStyles();

  return (
    <React.Fragment>
      <Container maxWidth={false}>
        <div className={classes.drawerIcon}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setRootStore({ ...rootStore, drawerOpen: true })}
          >
            <MenuIcon/>
          </IconButton>
        </div>
        <Grid container className={classes.containerGrid} justify={'center'}>
          <CssBaseline/>
          <Grid item lg={2} md={2} sm={12} className={classes.profileImageGrid}>
            <img src={process.env.PUBLIC_URL + "/images/profile.jpg"} className={classes.profileImage}
                 alt="Narottam Singh Bisht"/>
          </Grid>
          <Grid item lg={5} md={4} sm={12} className={classes.headerIntro}>
            <Typography variant="h4" className={classes.profileIntroName}>
              Hey 👋 Welcome
              <span role="img" aria-label="welcome-emoji"/>,
              <br/>
              I'm <strong>{portfolioInfoStore.name}</strong>
              <span role="img" aria-label="name-emoji">🕺🙇‍♂️</span>
            </Typography>
            <Typography variant="h6" className={classes.profileIntroSpacing}>
              {portfolioInfoStore.achievements}
            </Typography>
            <div>
              {
                socialParty.length > 0 &&
                socialParty.map((socialLink, index) => {
                  const SocialIcon = socialIconsArray.filter(_socialIcon => _socialIcon.type.displayName.toLowerCase().includes(socialLink.id));
                  return (
                    <Tooltip key={index} title={socialLink.tooltip}>
                      <IconButton
                        edge={'start'}
                        onClick={() => window.open(socialLink.social_link)}>
                        {SocialIcon}
                      </IconButton>
                    </Tooltip>
                  )
                })
              }
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}/>
          <Grid item lg={2} md={3} sm={12} className={classes.downloadCvGrid}>
            <div className={classes.lottieAnimationDiv} id="lottie"/>
          </Grid>
        </Grid>
        <Drawer {...props} />
      </Container>
      <Switch>
        <Route path={'/'} exact component={Home}/>
        <Route path={'/about'} exact component={About}/>
        <Route path={'/my-work'} exact component={MyWork}/>
        <Route path={'/contact-me'} exact component={ContactMe}/>
      </Switch>
      <p style={{ textAlign: 'center' }}>
        © 2020 Narottam Bisht. All Rights Reserved
      </p>
    </React.Fragment>
  )
}

export default Header;