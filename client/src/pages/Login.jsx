import React from 'react'
import '../index.css'
import {Form , Input} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { hideloading, showLoading } from '../redux/alertsSlice';
const Login = () => {
    // const {loading} = useSelector(state=> state.alerts);
    // console.log(loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) =>{
        // console.log('Recived registration' , values);
        try {
            dispatch(showLoading());
            const response = await axios.post('api/user/login', values);
            dispatch(hideloading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to Home page");
                localStorage.setItem("token", response.data.data);
                navigate("/");
            }else{
                toast.error(response.data.message);
                // localStorage.setItem("token", response.data.data);
            }
        } catch (error) {
            dispatch(hideloading());
            toast.error('Something went wrong');
        }
    }
     
  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Welcome Back</h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label = "Email" name="email">
                   <Input  placeholder='Email'/>
                </Form.Item>
                <Form.Item label = "Password" name="password">
                   <Input  placeholder='Password' type='password'/>
                </Form.Item>
                <button className='primary-button my-2' htmltype = 'submit'>Login</button>
                <Link to='/register' className='anchor '>
                    Click here to Register
                </Link>
            </Form>
        </div>  
    </div>
  )
}

export default Login