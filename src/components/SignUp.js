import styled from 'styled-components';
import axios from 'axios';
import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import validateEmail from './validate/validateEmail';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        if (username && password && validateEmail(email) && password === password2){
            setIsLoading(true);
            const body = {
                email,
                password,
                username
            };
            const request = axios.post('http://localhost:4000/sign-up', body);
            request.then((response)=> {
                setIsLoading(false);
                history.push("/");
            });
            request.catch((error)=> {
                if(error.response.status === 403) {
                    alert('This e-mail is already in use, please proceed to log in page or use a different e-mail address');
                } else if(error.response.status === 400) {
                    alert('Um dos campos está em branco!');
                } else {
                    alert(error.response.status);
                }
                setIsLoading(false);
            })
        }
        if (!validateEmail(email)){
            alert("Please, provide your e-mail");
            return;
        }
        if (!password){
            alert("Please, enter a password");
            return;
        }
        if (!username){
            alert("Please, tell us your username");
            return;
        }
        if (password !== password2){
            alert("As senhas inseridas são diferentes entre si!");
        }
    }

    return(
        <Body>
            <LogInBox>
                <Title>MyWallet</Title>
                <Form onSubmit={signUp}>
                <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="Nome"></input>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="E-mail" ></input>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Senha"></input>
                    <input onChange={(e)=>setPassword2(e.target.value)} value={password2} type="password" placeholder="Confirme sua senha"></input>
                    <Button isloading={isLoading} disabled={isLoading} type="submit">Cadastrar</Button>
                    <Link to='/'><p>Já tem uma conta? Entre agora!</p></Link>
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