import styled from 'styled-components';
import {useState, useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import UserContext from './contexts/UserContext';

export default function NewEntryIn() {
    const {user} = useContext(UserContext);
    const [entryValue, setEntryValue] = useState("");
    const [entryDescription, setEntryDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function submitEntry(e) {
        e.preventDefault();
        if(entryValue === "" || entryDescription === "") {
            alert("Por favor, preencha todos os campos antes de prosseguir.")
        } else {
            setIsLoading(true);
            const body = {
                entryValue: entryValue,
                categoryId: 1,
                entryDescription: entryDescription
            };
            const request = axios.post(`http://localhost:4000/new-entry-in/${user.userId}`, body);
            request.then((response) => {
                setIsLoading(false);
                history.push("/home");
            });
            request.catch((error)=> {
                setIsLoading(false);
                alert('Houve um erro ao postar sua entrada.');
            });
        }
    }

    return(
        <Body>
            <Header>
                <Title>Nova entrada</Title>
            </Header>
            <Form onSubmit={submitEntry}>
                <input onChange={(e)=>setEntryValue(e.target.value)} value={entryValue} type="text" placeholder="Valor" ></input>
                <input onChange={(e)=>setEntryDescription(e.target.value)} value={entryDescription} type="text" placeholder="Descrição"></input>
                <Button isloading={isLoading} disabled={isLoading} type="submit">Salvar entrada</Button>
            </Form>
        </Body>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #8B17BC;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const Header = styled.div`
    width: calc(100vw - 50px);
    display: flex;
    position: fixed;
    top: 25px;
    left: 25px;
`;

const Title = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-size: 26px;
    line-height: 31px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 22px;
`;

const Form = styled.form`
    width: calc(100vw - 50px);
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    margin-top: 78px;
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