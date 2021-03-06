import axios from './../../axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import MainLoading from '../../Components/MainLoading'
import { useDispatch, useSelector } from 'react-redux';
import { setisAuth, updateUserInfo } from '../../Redux/userSlice';
const config = require('./../../config.json');

export default function login() {
    const [isLoading, SetIsLoading] = useState(false);
    const [_Error, set_Error] = useState({ status: false, detail: '' });
    const [authComplete, setAuthComplete] = useState(false)
    const globaluser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const HandleLogin = (event) => {
        event.preventDefault();
        SetIsLoading(true);
        set_Error({ status: false, detail: '' });
        const data = new FormData(event.currentTarget);
    
        const password = data.get('password');
        const phone = data.get('phone');

        if (password && phone) {
          axios
            .post(config.api_login, {
              phone: phone,
              password: password,
            })
            .then(function (res) {
              if (!res.data || res.data.length == 0) {
                set_Error({ status: true, detail: res.data.detail });
                SetIsLoading(false);
              } else {
                localStorage.setItem("token", res.data.token.toString());
                console.log(res);
                if (res.data.user.id) {
                  dispatch(updateUserInfo({
                    'id': res.data.user.id,
                    'phone': res.data.user.phone,
                    'first_login': res.data.user.first_login,
                  }));
                  dispatch(setisAuth());
                  setAuthComplete(true);
                  
                }
                SetIsLoading(false);
              }
            })
            .catch(function (error) {
              console.log("error->",error)
              set_Error({
                status: true,
                detail: 'Please check your mobile number and Password.',
              });
              SetIsLoading(false);
            });
        }
      };

      
      if(authComplete){return <Navigate to="/" />}
      if(isLoading){return <MainLoading />}
      if(globaluser.isAuth){return <Navigate to="/" />}

      
  return (
    <div>

        <div>
          <div className='min-h-full flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
              <div>
                <img
                  className='mx-auto h-12 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                  alt='Workflow'
                />
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                  Login to your Account
                </h2>
                <p className='mt-2 text-center text-sm text-gray-600'>
                  <Link
                    to='#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Enter Your 10 digit Phone Number
                  </Link>
                </p>
              </div>
              <form
                className='mt-8 space-y-6'
                noValidate
                onSubmit={HandleLogin}
              >
                <div>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Phone Number
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>+91 </span>
                    </div>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>

                <div className='mt-1 relative rounded-md shadow-sm'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Password
                  </label>

                  <input
                    type='password'
                    name='password'
                    id='password'
                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md'
                  />
                </div>
                {_Error.status ? (
                  <p className='mt-2 text-center text-sm text-red-600'>
                    {_Error.detail}
                  </p>
                ) : (
                  ''
                )}
                <div>
                  <button
                    type='submit'
                    className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    <span className='absolute left-0 inset-y-0 flex items-center pl-3'></span>
                    Login
                  </button>
                </div>
              </form>
              <p className='mt-2 text-center text-sm text-gray-600'>
                Forgot Password?{' '}
                <Link
                  to='/accountRecovery'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Reset Here
                </Link>
              </p>

              <p className='mt-2 text-center text-sm text-gray-600'>
                Don't Have account?{' '}
                <Link
                  to='/register'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Register Here
                </Link>
              </p>
              <p className='mt-1 text-center text-sm text-gray-600'>
                I agree with your <br />
                <Link
                  to='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Terms and Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      
    </div>
  )
}
