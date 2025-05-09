import React from 'react';
import Header from '../components/Header';
import AuthForm from '../forms/AuthForm';

const Login = () => {
    return (
        <div>
            <Header />
            <AuthForm type="login" />
        </div>
    );
};

export default Login;
