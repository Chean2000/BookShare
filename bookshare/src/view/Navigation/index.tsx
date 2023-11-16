import React from 'react'
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useUserStore } from '../../stores';
import { useCookies } from 'react-cookie';
import Authentication from '.././Authentication';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import SwipeableTemporaryDrawer from './LeftDrawer/index';


export default function Navigation() {

  const { user , removeUser } = useUserStore();
  const [ cookies, setCookies ]  = useCookies();

  let nav = useNavigate();
  
  const logOutHandler = () => {
    setCookies('token', '', { expires: new Date() }); // 쿠키 삭제
    removeUser(); //사용자 정보 삭제
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
         
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => nav('/')}>
            BOOKSHARE
          </Typography>
          { user ? 
            (
            <>
            <IconButton color="inherit"><Typography variant="h6" component="div" sx={{ fontSize:'20px' }} onClick={() => nav('/mypage/')}>&nbsp;&nbsp;MYPAGE</Typography></IconButton>
            &nbsp;
            <IconButton color="inherit" onClick={() => logOutHandler()}><LogoutIcon /></IconButton>
            </>
            ) 
            : 
            (<Button color="inherit" onClick={() => nav('/api/auth/signIn')}>Login</Button>)  
          }
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}

/*

 { user ? <SwipeableTemporaryDrawer /> 
          : 
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ><MenuIcon />
            </IconButton>
          }

*/
