import styled from 'styled-components';
import axios from 'axios';
import {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import UserContext from './contexts/UserContext';
import validateEmail from './validate/validateEmail';

export default function LogIn() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(()=>{
        if(user !== null){
            history.push('/home');
        }
    },[user,history]);

    function login(e) {
        e.preventDefault();
        if (validateEmail(email) && password){
            setIsLoading(true);
            const body = {email, password};
            const request = axios.post('http://localhost:4000/log-in', body);
            request.then((response)=> {
                setIsLoading(false);
                localStorage.setItem('user',JSON.stringify({
                    user: response.data.user,
                    userId: response.data.userId,
                    token: response.data.token, 
                    config: {headers: {Authorization: `Bearer ${response.data.token}`}} 
                    }));
                setUser({
                    user: response.data.user,
                    userId: response.data.userId,
                    token: response.data.token, 
                    config: {headers: {Authorization: `Bearer ${response.data.token}`}} 
                    })
                history.push('/home');
            })
            request.catch((error)=> {
                setIsLoading(false);
                if(error.response.status === 403){
                    alert('Email ou senha incorretos.');
                }
            })
        } else {
            alert('Por favor insira seu email e sua senha.');
        }
    }

    function goTo(path) {
        history.push(path);
    }

    return(
        <Body>
            <LogInBox>
                <Title>MyWallet</Title>
                <Form onSubmit={login}>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="E-mail" ></input>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Senha"></input>
                    <Button isloading={isLoading} disabled={isLoading} type="submit">Entrar</Button>
                    <p onClick={()=> goTo('/signup')}>Primeira vez? Cadastre-se!</p>
                </Form>
            </LogInBox>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8B17BC;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogInBox = styled.div`
    width: calc(100vw - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 24px;
`;

const Form = styled.form`
    width: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    p:hover,button:hover{
        filter: contrast(140%);
    }
    p:active,button:active{
        filter: contrast(80%);
    }
    input {    
        font-size: 20px;
        line-height: 23px;
        margin-bottom:13px;
        color: #000000;
        width: 100%;
        height: 58px;
        background: #FFFFFF;
        border-radius: 6px;
        border: none;
        text-indent: 12px;
        outline:none;
    }
    input::placeholder{
        color: #000000;
    }
    input:focus{
        box-shadow: inset 4px 0px 0px #A328D6;
    }
    p{
        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
        color: #FFFFFF;
        cursor: pointer;
    }
`

const Button = styled.button`
    width: 100%;
    height: 46px;
    margin-bottom:36px;
    background: #A328D6;
    border-radius: 6px;
    font-size: 20px;
    line-height: 23px;
    font-weight: 700;
    color: #FFF;
    border: none;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
    opacity: ${props=> props.isloading ? 0.7 : 1};
    :hover{
        background-color:#18a9f2;
    }
`