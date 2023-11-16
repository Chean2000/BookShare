import React from 'react'
import Navigation  from '../../Navigation';
import Box from '@mui/material/Box';
import Authentication from '../../Authentication';
import MyPageMain from '../../MyPage';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../../stores';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import List from '../ListLayout/index';
import Container from '@mui/material/Container';
import AddBook from '../../MyPage/AddBook/index';
import Button from '@mui/material/Button';
import Home from './Home';


export default function MainLayout() {
  const [ mypageResponse, setMypageResponse] = useState<String>('');
  const [ cookies ] = useCookies();
  const { user }  = useUserStore();

  const  getMypage = async (token: string) => {

    const requestOption ={
      headers:{
        Authorization: `Bearer ${token}`
      }
    };

    await axios.get("http://localhost:4000/api/mypage/", requestOption).then((response) => {
      setMypageResponse(response.data);
      
    }).catch((error) => '');
  }

  useEffect(() => {
    const token = cookies.token;
    if (token) getMypage(token);
    else setMypageResponse('');
  }, [cookies.token]);
  
  return (
    <>
    <Container sx={{height:'11vh'}}>
      <Navigation />
    </Container>

    <Container sx={{height:'89vh'}}>
      <Box>
        <Routes>
            <Route path="/" element={ <Home /> }></Route>
            <Route path="/list/" element={ <List /> }></Route>
            <Route path="/api/auth/signIn" element={< Authentication /> }></Route>
            <Route path="/mypage/" element={< MyPageMain /> }></Route>
            <Route path="/mypage/addbook" element={ < AddBook /> }></Route>
        </Routes>
      </Box>
    </Container>
    </>
  )
}

//{ user ? ( <MyPageMain /> ) : ( <Authentication /> )}

/*
  const [ mypageResponse, setMypageResponse] = useState<String>('');
  const [ cookies ] = useCookies();
  const { user }  = useUserStore();

  const  getMypage = async (token: string) => {

    const requestOption ={
      headers:{
        Authorization: `Bearer ${token}`
      }
    };

    await axios.get("http://localhost:4000/api/mypage/", requestOption).then((response) => {
      setMypageResponse(response.data);
      
    }).catch((error) => '');
  }

  useEffect(() => {
    const token = cookies.token;
    if (token) getMypage(token);
    else setMypageResponse('');
  }, [cookies.token]);
*/