import axios from 'axios';
import Cookies from 'js-cookie'

// const url = 'http://localhost:5000';
const url = 'https://helpinghandsorganization.herokuapp.com';
axios.defaults.withCredentials = true;

//getting payment status with the order id
export const getOrderStatus  =async (orderid) =>{
   const data = await axios.get(`${url}/payments/paymentstatus/${orderid}`);
//    const jsonres = await response.json();
   return data.data.body;
}


//getting list of all the donations received
export const getDonationsReceived  =async () =>{
   const data = await axios.get(`${url}/api/donationsreceived `);
   return data.data.body;
}

//adding post to the database
export const addPostHandler  =async (data) =>{
   await axios.post(`${url}/api/posts `, data);
}

//gettting a specific post
export const getPostByTitle  =async (postid) =>{
   const data = await axios.get(`${url}/api/posts/${postid}`);
   return data.data;
}


//getting all posts
export const getAllPosts  =async (postid) =>{
   const data = await axios.get(`${url}/api/posts`);
   return data.data;
}

//add donatedto to database
export const addDonatedTo  =async (data) =>{
   await axios.post(`${url}/api/donatedto`, data);
}

//getting all posts
export const getDonatedTo  =async () =>{
   const data = await axios.get(`${url}/api/donatedto`);
   return data.data;
}

//login 
export const verifyLogin = async (postData)=>{
   try{
      const data = await axios.post(`${url}/api/user`, postData);
      return data.data;
   }catch(error){
      return error.response.data;
   }
   
}

//login 
export const checkLoggedIn = async ()=>{
      const data = await axios.get(`${url}/api/user/authentication`);
      return data.data;
}

//logout
export const logoutApi = async ()=>{
   const data = await axios.get(`${url}/api/user/logout`);
   return data.data;
}