import React, {useEffect, useState} from 'react';
import './Home.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '../ListLayout/index';

export default function Home() {

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

  let nav = useNavigate();

  const ariaLabel = { 'aria-label': 'description' };

  return (
    <>
    <div className='d' style={{ float:'left'}}>
      <FormControl sx={{ minWidth: 120 , marginTop:'25vh'}}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>조건</em>
          </MenuItem>
          <MenuItem value={10}>제목</MenuItem>
          <MenuItem value={20}>저자</MenuItem>
          <MenuItem value={30}>출판사</MenuItem>
        </Select>
      </FormControl>
      <p><Input placeholder="search.." inputProps={ariaLabel} style={{width:'500px', height:'55px', fontSize:'25px',paddingLeft:'15px'}}/></p>
      <p><Button style={{width:'500px',height:'53px'}}><Typography style={{fontSize:'17px'}}>검색하기</Typography></Button></p>
    </div>
    <div className='d' style={{marginLeft:'40px', width:'40vw'}}>
    <List />
    </div>
    
     </>
  )
    
}
