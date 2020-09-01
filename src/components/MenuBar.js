import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);

  const menuBar = !user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name='home' as={NavLink} to='/' exact default/>
      <Menu.Menu position='right'>
        <Menu.Item name='login' as={NavLink} to='/login' exact />
        <Menu.Item name='register' as={NavLink} to='/register' exact />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name='Feed' as={NavLink} to='/' exact default/>
      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout} as={NavLink} to='/login' exact />
      </Menu.Menu>
    </Menu>
  )

  return menuBar;
};

export default MenuBar;
