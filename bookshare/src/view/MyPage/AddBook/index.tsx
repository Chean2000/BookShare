import React from 'react'
import './index.css';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { useUserStore } from '../../../stores';
import { useEffect, useState } from 'react';
import axios from "axios";

const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });



export default function AddBook() {

    const [title, setTitle] = useState<String>('');
    const [author, setAuthor] = useState<String>('');
    const [publisher, setPublisher] = useState<String>('');
    const [types, setTypes] = useState<String>('');
    const [location, setLocation] = useState<String>('');

    const AddBookHandler = () => {
        const data = {
            title,
            author,
            publisher,
            types,
            location
        };    
      
        axios.post("http://localhost:4000/api/mypage/addbook", data).catch((error) => '');
    }



    const outerTheme = useTheme();

    const [imageSrc, setImageSrc]: any = useState(null);

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null); // 파일의 컨텐츠
                resolve();
            };
        });
    }


  return (
    <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: { sm: '1fr 1fr 1fr' },
      gap: 2,
      padding:'9px'
    }}
  >
    
    
    <div className='imgDiv' > 
    <p><Typography variant='h6' style={{fontWeight:'600', fontSize:'30px'}}>도서 정보</Typography></p>
        <img 
            width={'90%'} 
            src={imageSrc} 
        />
        <input 
            accept="image/*" 
            multiple type="file"
            onChange={e => onUpload(e)}
        />
        
    </div>
    <div style={{marginTop:'62px'}}>
        <>
        <div className='imgDiv'>
        <ThemeProvider theme={customTheme(outerTheme)}>
        <p><TextField style={{width:'550px'}} label="제목" variant="standard" onChange={(e)=> setTitle(e.target.value)}/></p>
        <p><TextField style={{width:'250px'}} label="저자" variant="standard" onChange={(e)=> setAuthor(e.target.value)}/></p>
        <p><TextField style={{width:'250px'}} label="출판사" variant="standard" onChange={(e)=> setPublisher(e.target.value)}/></p>
        <p><TextField style={{width:'250px'}} label="분류" variant="standard" onChange={(e)=> setTypes(e.target.value)}/></p>
        <p><TextField style={{width:'250px'}} label="위치" variant="standard" onChange={(e)=> setLocation(e.target.value)} /></p>
        </ThemeProvider>
        </div>
        <div>
            <Button variant="contained" style={{marginTop:'10px', width:'250px'}} onClick={() => AddBookHandler() }>책 추가하기</Button>
        </div>
        </>
    </div>
 
    
    
  </Box>
  )
}
