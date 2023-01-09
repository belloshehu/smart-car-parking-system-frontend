import React, {useEffect} from 'react'
import {BsFacebook} from 'react-icons/bs'
import {AiFillGoogleCircle} from 'react-icons/ai'
import useSubmit from '../hooks/useSubmit'
import { useFormik } from 'formik'
import { useGlobalContext } from '../lib/context'
import * as Yup from 'yup'
import Modal from './Modal'
import { useRouter } from 'next/router'

const LoginForm = () => {
    const {isOpen, onOpen, setUser, onClose, setIsAuthenticated} = useGlobalContext()
    const {response, submit, setResponse} = useSubmit()
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values)=>{
            submit('http://localhost:8000/login', values, 'POST');
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email required'),
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password required")
            .matches(/[a-z]+/, "Must contain atleast one lowercase character")
            // .matches(/[A-Z]+/, "One uppercase character")
            // .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "Must contain atleast one number"),
        })
    })
    useEffect(() => { 
        if (response) { 
            if (response.type === 'success') { 
                formik.resetForm(); 
                onOpen('success', 'You have successfully logged in!'); 
                localStorage.setItem('token', response.data.token)
                setIsAuthenticated(true)
                setUser(response.data.user)
                router.push('/')
            }
            setTimeout(()=>{
                onClose()
                setResponse(null)
            }, 5000)
        } 
    }, [response]); 

    return (
        <div className='w-full p-2 lg:w-4/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500 '>
            {
                isOpen? <Modal /> : ""
            }
            <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col gap-2  text-left'>
                    <label htmlFor='email' className='text-white'>Email</label>
                    <input 
                            id='email'
                            // name='email'
                            type='email' 
                            placeholder='Enter email' 
                            className='p-4 outline-none border-none'
                            {...formik.getFieldProps('email')}
                        />
                    <small className='text-red-500'>{formik.errors.email}</small>
                </div>
                <div className='flex flex-col gap-2 text-left'>
                    <label htmlFor='password' className='text-white'>Password</label>
                    <input 
                            id='password'
                            // name='password'
                            type='password' 
                            placeholder='Enter password' 
                            className='p-4 outline-none border-none'
                            {...formik.getFieldProps('password')}
                        />
                    <small className='text-red-500'>{formik.errors.password}</small>
                </div>
                <input  type='submit' className='w-full p-3 bg-amber-600 my-3 text-white' value='Submit'/>

                <div className='flex justify-between items-center text-slate-100'>
                    <p>Login with</p>
                    <div className='flex gap-4'>
                        <BsFacebook className='bg-blue-600 rounded-full text-3xl hover:text-4xl transition-all duration-200 ease-linear'/>
                        <AiFillGoogleCircle className='bg-green-700 rounded-full text-3xl hover:text-4xl transition-all duration-200 ease-linear' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm