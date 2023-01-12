import React, {useEffect, useState} from 'react'
import {BsFacebook} from 'react-icons/bs'
import {AiFillGoogleCircle} from 'react-icons/ai'
import * as Yup from 'yup'
import {useFormik} from 'formik'; 
import useSubmit from '../hooks/useSubmit';
import { useGlobalContext } from '../lib/context';
import Modal from './Modal';
import { useRouter } from 'next/router';


const SignupForm = () => {
    const {response, submit, setResponse} = useSubmit(); 
    const { onOpen, isOpen, onClose, backendUrl } = useGlobalContext(); 
    
    const router = useRouter()

    const formik = useFormik({ 
        initialValues: { 
            email: "", 
            password: "", 
            first_name: "",
            second_name: "",
            confirm_password: "", 
        }, 
        onSubmit: (values) => { 
            submit(`${backendUrl}/signup`, values, 'POST'); 
            onOpen("Signing up", "Please wait...")
        }, 
        validationSchema: Yup.object({ 
            email: Yup.string().email("Invalid email address").required("Email required"), 
            first_name: Yup.string().required("First name required"), 
            second_name: Yup.string().required("Second name required"), 
            password: Yup.string().min(8, "Must be at least 8 characters").required("Password required")
                .matches(/[a-z]+/, "Must contain atleast one lowercase character")
                // .matches(/[A-Z]+/, "One uppercase character")
                // .matches(/[@$!%*#?&]+/, "One special character")
                .matches(/\d+/, "Must contain atleast one number"),
            confirm_password: Yup.string()
                .label('confirm password')
                .required('Confirm password required').oneOf([Yup.ref('password'), null], 'Passwords must match')
        }), 
    }); 
    
    useEffect(() => { 
        if (response) { 
            onOpen(response.type, response.message)
            if (response.type === 'success') { 
                formik.resetForm(); 
                router.push('/login')
            }
            setTimeout(()=>{
                onClose()
                setResponse(null)
            }, 5000)
        } 
    }, [response]); 

    return (
        <div className='w-full p-2 md:w-6/12 md:p-10 bg-slate-600 shadow-md shadow-slate-500'>
            {
                 isOpen && <Modal />
            }
            <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col lg:flex-row justify-between gap-2'>
                    <div className='flex flex-col gap-2 text-left w-full'>
                        <label htmlFor='first_name' className='text-white'>First Name</label>
                        <input 
                            id='first_name'
                            // name='email'
                            type='text' 
                            placeholder='Enter first name' 
                            className='p-4 outline-none border-none'
                            {...formik.getFieldProps('first_name')}
                        />
                        <small className='text-red-500'>{formik.errors.first_name}</small>
                    </div>
                    <div className='flex flex-col gap-2  text-left w-full'>
                        <label htmlFor='second_name' className='text-white'>Second Name</label>
                        <input 
                            id='second_name'
                            // name='email'
                            type='text' 
                            placeholder='Enter second name' 
                            className='p-4 outline-none border-none'
                            {...formik.getFieldProps('second_name')}
                        />
                        <small className='text-red-500'>{formik.errors.second_name}</small>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row justify-items-stretch'>
                    <div className='flex flex-col gap-2 text-left w-full'>
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
                </div>

                <div className='flex flex-col lg:flex-row justify-between gap-2'>
                    <div className='flex flex-col gap-2 text-left w-full'>
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
                    <div className='flex flex-col gap-2 text-left w-full'>
                        <label htmlFor='confirm_password' className='text-white'>Confirm Password</label>
                        <input 
                            id='confirm_password'
                            // name='password2'
                            type='password' 
                            placeholder='Enter password' 
                            className='p-4 outline-none border-none'
                            {...formik.getFieldProps('confirm_password')}
                        />
                        <small className='text-red-500'>
                            {
                                formik.errors.confirm_password
                            }
                        </small>
                    </div>
                </div>
                
                <input  type='submit' className='w-full p-3 bg-amber-600 my-3' value='Submit'/>
                <div className='flex justify-between items-center text-slate-100 bg-slate-400 rounded-full p-2 px-4 opacity-90 group'>
                    <p className=' group-hover:translate-x-5 lg:group-hover:translate-x-20 transition-all duration-300 ease-in-out'>Sign up with</p>
                    <div className='flex gap-4 group-hover:-translate-x-5 lg:group-hover:-translate-x-20 transition-all duration-300 ease-in-out'>
                        <BsFacebook className='bg-blue-600 rounded-full text-3xl hover:text-4xl transition-all duration-200 ease-linear'/>
                        <AiFillGoogleCircle className='bg-green-700 rounded-full text-3xl hover:text-4xl transition-all duration-200 ease-linear' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignupForm