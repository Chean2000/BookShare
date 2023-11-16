import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import { signUpApi } from '../../../api';

interface Props {
    setAuthView: (authView: boolean) => void,
}


export default function SignUp(props: Props) {

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [passwordCheck, setPasswordCheck] = useState<String>('');
    const [name, setName] = useState<String>('');
    const [phone, setPhone] = useState<String>('');

    const { setAuthView } = props;

    const SignUpHandler = async () => {
        const data = {
            email,
            password,
            passwordCheck,
            name,
            phone
        };
        
        const signUpResponse = await signUpApi(data);
        
        if(!signUpResponse){
            alert('회원가입 실패');
            return;
        }
        if(!signUpResponse.result){
            alert('회원가입에 실패');
            return;
        }
        
        alert('회원가입에 성공');
        setAuthView(false);
    
    }
    

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

   return (
    <Card sx={{ minWidth: 275, maxWidth: "40vw", padding:"10px"}}>
        <Box>
            <Typography variant='h6' sx={{ textAlign: 'center' }} >회원가입</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

        <div>
            <TextField
            id="standard-start-adornment"
            fullWidth sx={{ marginBottom: 1, marginTop:2 }}
            InputProps={{
                startAdornment: <InputAdornment position="start">이메일</InputAdornment>,
            }}
            variant="standard"
            onChange={(e)=> setEmail(e.target.value)}
            />
        
            <FormControl variant="standard" fullWidth sx={{ marginBottom: 1}} >
                <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
                <Input 
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <FormControl  variant="standard" fullWidth sx={{ marginBottom: 2}}>
                <InputLabel htmlFor="standard-adornment-password">비밀번호 확인</InputLabel>
                <Input 
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />
            </FormControl>

            <TextField 
            id="standard-start-adornment"
            fullWidth sx={{ marginBottom: 2}}
            InputProps={{
                startAdornment: <InputAdornment position="start">이름</InputAdornment>,
            }}
            variant="standard"
            onChange={(e)=> setName(e.target.value)}
            />

            <TextField 
            id="standard-start-adornment"
            fullWidth sx={{ marginBottom: 4}}
            InputProps={{
                startAdornment: <InputAdornment position="start">전화번호</InputAdornment>,
            }}
            variant="standard"
            onChange={(e)=> setPhone(e.target.value)}
            />
        </div>
        </Box>
       
        <Button fullWidth  sx={{ marginBottom: 2}} variant="outlined" onClick={() => SignUpHandler() }> 회원가입 </Button>
        <Box component='div' margin={'10px'} display='flex'>
                <Typography sx={{ textAlign: 'center' }}>이미 계정이 있으신가요?</Typography>
                <Typography fontWeight={800} sx={{ textAlign: 'center' }} onClick={() => setAuthView(false)}>&nbsp;&nbsp;로그인</Typography>
            </Box>
    </Card>

    )

}
 