import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Header = styled(AppBar)({
  zIndex: 1201,
  background: '#fff',
  height: 70,
  boxShadow: 'inset 0 -1px 0 0 #dadce0',
});

const Heading = styled(Typography)({
  color: '#5F6368',
  fontSize: 24,
  marginLeft: 25,
});

interface HeaderBarProps {
  open: boolean;
  handleDrawer: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ open, handleDrawer }) => {
  const logo = 'https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png';

  return (
    <Header>
      <Toolbar>
        <IconButton
          onClick={handleDrawer}
          sx={{ marginRight: '20px' }}
          edge="start"
        >
          <Menu />
        </IconButton>
        <img src={logo} alt="logo" style={{ width: 30 }} />
        <Heading>Notes</Heading>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
