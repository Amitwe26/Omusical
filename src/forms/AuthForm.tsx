import {SubmitHandler, useForm} from 'react-hook-form';
import { login, signup } from '../services/authService';
import { useState } from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
// import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

type AuthFormProps = {
    type: 'login' | 'signup';
};

type FormData = {
    email: string;
    password: string;
};

const AuthForm = ({ type }: AuthFormProps) => {
    const { register, handleSubmit } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setError(null);
        try {
            if (type === 'login') {
                await login(data.email, data.password);
                console.log('Logged in successfully!');
                navigate('/live'); // אחרי הצלחה מעביר לעמוד הלייב
            } else {
                await signup(data.email, data.password);
                console.log('Signed up successfully!');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    /*const onSubmit = async (data: SubmitHandler<AuthFormInputs>) => {
        try {
            if (type === 'login') {
                await signInWithEmailAndPassword(auth, data.email, data.password);
            } else {
                await createUserWithEmailAndPassword(auth, data.email, data.password);
            }
        } catch (error) {
            console.error(error);
        }
    };*/


    return (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
            <Input {...register('email')} placeholder="Email" type="email" required/>
            <Input {...register('password')} placeholder="Password" type="password" required/>
            {error && <ErrorText>{error}</ErrorText>}
            <SubmitButton type="submit">{type === 'login' ? 'Login' : 'Signup'}</SubmitButton>

            {/* כפתור חזרה לעמוד הבית */}
            <BackButton type="button" onClick={() => navigate('/')}>
                Back to Home
            </BackButton>
        </FormWrapper>
    );
};

export default AuthForm;


const FormWrapper = styled.form`
    max-width: 400px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #357ab8;
    }
`;

const ErrorText = styled.p`
    color: red;
    margin-bottom: 1rem;
`;

const BackButton = styled.button`
  margin-top: 12px;
  background-color: transparent;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
