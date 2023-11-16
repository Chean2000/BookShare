import React, { useState } from 'react'
import SignUp from './SignUp/index'
import SingIn from './SignIn/index'
import Box from '@mui/material/Box';

export default function Authentication() {
  // auhtView : true - signUp / false - signIn
  const [authView, setAuthView] = useState<boolean>(false);

  return (
    <>
     <Box display="flex" height='80vh'>
        <Box flex={1} display="flex" justifyContent='center' alignItems='center'></Box>
        <Box flex={1} display="flex" justifyContent='center' alignItems='center'>
          {authView ? (<SignUp  setAuthView = { setAuthView } />) : (<SingIn setAuthView = { setAuthView } />)}
        </Box>
    </Box>
  
    </>
  )
}
