import {useForm} from 'react-hook-form';
import {login, signup, signInWithGoogle} from '../services/authService';
import {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import { ReactComponent as GoogleIcon } from '../assets/svg/google-icon.svg';
// import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

type AuthFormProps = {
    type: 'login' | 'signup';
};

type FormData = {
    email: string;
    password: string;
};

const AuthForm = ({type}: AuthFormProps) => {
    const {register, handleSubmit} = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setError(null);
        try {
            if (type === 'login') {
                await login(data.email, data.password);
                console.log('Logged in successfully!');
                navigate('/'); // אחרי הצלחה מעביר לעמוד הלייב
            } else {
                await signup(data.email, data.password);
                console.log('Signed up successfully!');
                navigate('/');
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate('/rooms');
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
            <Title>{type === 'login' ? 'Login' : 'Signup'}</Title>
            <Input {...register('email')} placeholder="Email" type="email" required/>
            <Input {...register('password')} placeholder="Password" type="password" required/>
            {error && <ErrorText>{error}</ErrorText>}
            <SubmitButton type="submit">{type === 'login' ? 'Login' : 'Signup'}</SubmitButton>
            
            <OrDivider>
                <span>OR</span>
            </OrDivider>

            <GoogleButton type="button" onClick={handleGoogleSignIn}>
                <GoogleIconWrapper>
                    <GoogleIcon />
                </GoogleIconWrapper>
                Continue with Google
            </GoogleButton>

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

const Title = styled.h2`
    align-self: center;
`

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 20px;
    border-width: 0.5px;
    text-align: center;
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
    color: #883bc6;
    //text-decoration: underline;
    cursor: pointer;
    border: none;
`;

const OrDivider = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
    
    &::before,
    &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #ddd;
    }
    
    span {
        padding: 0 10px;
        color: #666;
        font-size: 14px;
    }
`;

const GoogleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    color: #757575;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const GoogleIconWrapper = styled.div`
    margin-right: 10px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
