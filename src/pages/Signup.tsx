import React from 'react';
import Header from '../components/Header';
import AuthForm from '../forms/AuthForm';

const Signup = () => {
    return (
        <div>
            <Header />
            <AuthForm type="signup" />
        </div>
    );
};

export default Signup;
