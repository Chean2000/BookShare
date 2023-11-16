import axios from "axios";
import React, { useState, useEffect } from 'react';


export const signInApi = async (data: any) => {

    const response = await axios.post("http://localhost:4000/api/auth/signIn", data).catch((error) => null);
    if (!response) return null;

    const result = response.data;
    return result;

}

export const signUpApi = async (data: any) => {
    const response = await axios.post("http://localhost:4000/api/auth/signUp", data).catch((error) => null);
    if (!response) return null;

    const result = response.data;
    return result;

}
/*
export const AddBookApi = (data: any) => {
    axios.post("http://localhost:4000/api/mypage/addbook", data).catch((error) => null);
  
}
*/