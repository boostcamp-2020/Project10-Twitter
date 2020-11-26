import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, SvgIcon } from '@material-ui/core';
import { Search, Home, Twitter } from '../../atoms/icons';
import IconLabel from '../../molecules/IconLabel';
import Text from '../../atoms/Text';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50vw',
    height: '95vh',
    backgroundColor: 'rgb(122, 204, 254)',
    '& div': {
      marginBottom: '40px',
    },
  },
  bigTwitter: {
    position: 'fixed',
    overflow: 'hidden',
    color: 'rgba(29,161,242,1.00)',
    width: '100%',
    height: '100%',
  },
  iconLabelContainer: {
    zIndex: 1,
  },
});

const LoginLeftSection: FunctionComponent = () => {
  const classes = useStyles();

  const IconTextcolor = 'white';
  const IconTextsize = '20px';
  const IconTextweight = 700;

  return (
    <Box component="div" className={classes.leftSection}>
      <SvgIcon className={classes.bigTwitter}>
        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
      </SvgIcon>
      <Box component="div" className={classes.iconLabelContainer}>
        <IconLabel>
          <Search />
          &nbsp; &nbsp;
          <Text
            value="관심사를 팔로우하세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </IconLabel>
        <IconLabel>
          <Home />
          &nbsp; &nbsp;
          <Text
            value="사람들이 무엇에 대해 이야기하고 있는지 알아보세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </IconLabel>
        <IconLabel>
          <Twitter color="black" />
          &nbsp; &nbsp;
          <Text
            value="대화에 참여하세요."
            color={IconTextcolor}
            size={IconTextsize}
            weight={IconTextweight}
          />
        </IconLabel>
      </Box>
    </Box>
  );
};

export default LoginLeftSection;
