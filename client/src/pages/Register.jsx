import React from 'react'
import '../index.css'
import {Form , Input} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideloading, showLoading } from '../redux/alertsSlice';
// import toast from 'react-hot-toast';


const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) =>{
        // console.log('Recived registration' , values);
        try {
            dispatch(showLoading());
            const response = await axios.post('api/user/register', values);
            dispatch(hideloading());
            if(response.data.success){
                toast.success(response.data.message);
                toast("Redirecting to login page");
                navigate("/login");
            }else{
                dispatch(hideloading());
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    }
  return (
    <div className='authentication'>
        <div className='authentication-form card p-3'>
            <h1 className='card-title'>Nice to meet you</h1>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item label = "Name" name="name">
                   <Input  placeholder='Name'/>
                </Form.Item>
                <Form.Item label = "Email" name="email">
                   <Input  placeholder='Email'/>
                </Form.Item>
                <Form.Item label = "Password" name="password">
                   <Input  placeholder='Password' type='password'/>
                </Form.Item>
                <button className='primary-button my-2' htmltype = 'submit'>REGISTER</button>
                <Link to='/login' className='anchor '>
                    Click here to login
                </Link>
            </Form>
        </div>  
    </div>
  )
}

export default Register