import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import  Button from '@mui/material/Button';
import './index.css';
import Stack from '@mui/material/Stack';
import { Card, CardContent } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import axios from "axios";
import { book } from '../../model';
import Input from '@mui/material/Input';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';


export default function MyPageMain() {
  
  let nav = useNavigate();

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'TITLE', width: 250 },
    { field: 'author', headerName: 'AUTHOR', width: 130 },
    { field: 'publisher', headerName: 'PUBLISHER', width: 110 },
    { field: 'types',  headerName: 'TYPES',  width: 160 },
    { field: 'location', headerName: 'LOCATION',  width: 110 }
  ];
  
  const rows = [
    { id: 1, author: '윤정은', title: '메리골드 마음 세탁소', publisher: '북로망스', types: '소설', location: '상계동' },
    { id: 2, author: '요한 하리', title: '도둑맞은 집중력', publisher: '어크로스', types:'인문', location:'상계동' },
    { id: 3, author: '김상현', title: '당신은 결국 무엇이든 해내는 사람', publisher: '필름(Feelm)', types:'에세이', location: '중계동'},
    { id: 4, author: '최은영', title: '아주 희미한 빛으로도', publisher: '문학동네', types:'소설', location: '중계동' },
    { id: 5, author: '세이노(SayNo)', title: '세이노의 가르침', publisher: '데이원', types:'자기계발', location: '공릉동'},
    { id: 6, author: '헤르만 헤세', title: '싯다르타', publisher: '민음사', types:'소설', location:'공릉동' }
  
  ];

  {/* 도서 정보 가져오려고 시도 ㅎ.. */}
  interface bookprop extends Omit<book,'bookimg'>{

  }

    const baseUrl = "http://localhost:8080";

    const [ data, setData ] = useState<bookprop[]>();

    useEffect(() => {
        putSpringData();
    },[])

    async function putSpringData() {
        await axios
        .get<bookprop[]>(baseUrl + "/mypage")
        .then((res)=>{
            console.log(res.data); 
            setData(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

const ariaLabel = { 'aria-label': 'description' };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' , height:'60vh', marginLeft:'-130px'}}
      >
        <Tab label="READING" {...a11yProps(0)} />
        <Tab label="MY bookshelf" {...a11yProps(1)} />
        <Tab label="INTERESTED" {...a11yProps(2)} />
        <Tab label="RESERVED" {...a11yProps(3)} />
        <Tab label="ALERT" {...a11yProps(4)} />
        <Tab label="Amend Info" {...a11yProps(5)} />
   
      </Tabs>
      <TabPanel value={value} index={0}>
        내가 읽고 있는 책
      </TabPanel>
      <TabPanel value={value} index={1}>
          <div className='d div'>내 도서</div>
          <div className='d div1'><Button onClick={() => nav('/mypage/addbook')} variant="outlined">책 추가하기</Button></div>
          <p></p>

          {/*
            <div>
                {data ? data.map((datas)=>(
                    <div key={datas.bookid}>
                        <div>책번호: {datas.bookid}</div>
                        <div>제목: {datas.title}</div>
                        <div>저자: {datas.author}</div>
                        <div>출판사: {datas.publisher}</div>
                        <div>분류: {datas.types}</div>
                    </div>
                )) : ''}
            </div>
            */}
          
          <div style={{ height: 400, width: '1000px' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
        </div>
        

      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        <div style={{marginLeft:'30px'}}><Typography variant='h6'	component='h2' gutterBottom>회원정보</Typography></div>
        <p></p>
        <Box
          component="form"
          sx={{'& > :not(style)': { m: 1 }, marginLeft:'40px' }}
          noValidate
          autoComplete="off"
        >
          <div><Typography>이메일</Typography><Input defaultValue="test@naver.com" inputProps={ariaLabel} /></div>
          <div><Typography>비빌번호</Typography><Input defaultValue="1111" inputProps={ariaLabel} /></div>
          <div><Typography>비빌번호 확인</Typography><Input defaultValue="1111" inputProps={ariaLabel} /></div>
          <div><Typography>이름</Typography><Input defaultValue="test" inputProps={ariaLabel} /></div>
          <div><Typography>전화번호</Typography><Input defaultValue="01099992222" inputProps={ariaLabel} /></div>
          <div><Typography>주소</Typography><Input defaultValue="노원구 상계동" inputProps={ariaLabel} /></div>   

          <p></p>    
         
          <Button style={{width:'200px', height:'30px'}} variant="contained">수정하기</Button>
         
        </Box>
        
      </TabPanel>
   
    </Box>
  );
}
