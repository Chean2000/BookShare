import { CardContent, CardHeader, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { signInApi } from '../../../api';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignIn(props: Props) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cookies, setCookies] = useCookies();
    const {user, setUser} = useUserStore();

    let nav = useNavigate();

    const {setAuthView} = props;

    const signInHandler = async () =>  {
        if(email.length === 0 || password.length === 0){
            alert('이메일과 비밀번호를 입력하세요.');
            return;
        };
        const data = {
            email,
            password
        };
        
        const signInResponse = await signInApi(data);

        if(!signInResponse) {
            alert("로그인에 실패하였습니다");
            return;
        }
    
        if(!signInResponse.result){
            alert('로그인에 실패했습니다');
            return;
        }
        const {token, exprTime, user} = signInResponse.data;
        const expires = new Date();
        expires.setMilliseconds(expires.getMilliseconds() + exprTime);

        setCookies('token', token, {expires});
        setUser(user);
        nav('/');
    };

  return (
    <Card sx={{ minHeight:"310px" , minWidth: "275px", maxWidth: "40vw",padding:"10px"}}>
            <Box><Typography variant='h6' sx={{ textAlign: 'center', marginTop:"5px"}}>로그인</Typography></Box>
            <Box height={'20vh'} margin={'10px'}>
                <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="비밀번호"
                    type="password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
      
            <Box component='div'>
                <Button fullWidth sx={{ marginBottom: 2}} variant="contained" onClick={() => signInHandler() }> 로그인 </Button>
            </Box>
            <Box component='div'sx={{marginTop:'15px'}} margin={'10px'} display='flex'>
                <Typography sx={{ textAlign: 'center' }}>신규 이용자이신가요?</Typography>
                <Typography fontWeight={800} sx={{ textAlign: 'center' }} onClick={() => setAuthView(true)}>&nbsp;&nbsp;회원가입</Typography>
            </Box>
    </Card>
      
  )
}
