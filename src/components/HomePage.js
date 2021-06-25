import styled from 'styled-components';
import {useState, useContext, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import UserContext from './contexts/UserContext';
import { BiExit } from "react-icons/bi";

export default function HomePage() {
    const {user, setUser} = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [isLoaded, setIsLoaded] = useState([]);
    const [amountOnWallet, setAmountOnWallet] = useState(0);
    const history = useHistory();

    const loadTransactions = useCallback((config) => {
        const requestTransactions = axios.get(`http://localhost:4000/transactions/${user.userId}`, config);
        requestTransactions.then((response)=>{
            const data = response.data;
            if (data.length > 0){
                setTransactions(data);
                setIsLoaded(1);
            } else if (data.length === 0){
                setIsLoaded(2);
            }
        }) 
        requestTransactions.catch((error)=>{
            if (error.response) {
                setIsLoaded(3);
            }
        })
        const requestAmountOnWallet = axios.get(`http://localhost:4000/wallets/${user.userId}`);
        requestAmountOnWallet.then((response)=>{
            const data = (response.data.amount/10).toFixed(2);
            setAmountOnWallet(data);
        })
    },[setIsLoaded, setTransactions, user.userId, setAmountOnWallet]);

    useEffect(()=>{
        if(user.config){
            loadTransactions(user.config)
        }
    },[ user,setTransactions,loadTransactions]);

    function goTo(path) {
        history.push(path);
    }

    function logOut() {
        localStorage.clear();
        setUser(null);
        goTo('/');
    }

    return(
        <Body>
            <Header>
                <Title>Olá, {user.user}</Title>
                <LogOutButton onClick={()=> logOut()}>
                    <BiExit></BiExit>
                </LogOutButton>
            </Header>
            <TransactionsBox>
                {isLoaded === 1 
                    ?
                    transactions.map((t, i) => (
                            <TransactionDescription key={i}>
                                <Date>{t.date}</Date>
                                <Description>{t.description}</Description>
                                <Value category={t.categoryid}>{(t.value/10).toFixed(2)}</Value>
                            </TransactionDescription>
                        )
                    ) : (isLoaded === 2)
                    ? <EmptyTransactionsBox>Não há registros de entrada ou saída.</EmptyTransactionsBox>
                    : <EmptyTransactionsBox>Algo deu errado.</EmptyTransactionsBox>
                }
            </TransactionsBox>
            <TotalAmount>
                <h1>SALDO</h1>
                <h2 category={'1'}>{amountOnWallet}</h2>
            </TotalAmount>
            <EntriesBox>
                <EntryButton onClick={()=> goTo('/new-entry/in')}>
                    <h1>+</h1>
                    <h1>Nova entrada</h1>
                </EntryButton>
                <EntryButton onClick={()=> goTo('/new-entry/out')}>
                    <h1>-</h1>
                    <h1>Nova saída</h1>
                </EntryButton>
            </EntriesBox>
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
    position: relative;
`;

const Header = styled.div`
    width: calc(100vw - 50px);
    display: flex;
    justify-content: space-between;
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

const LogOutButton = styled.h1`
    font-size: 26px;
    color: #FFFFFF;
    background: none;
    border: none;
    margin-bottom: 22px;
    cursor: pointer;
    :hover {
        color: red;
        opacity: 0.7;
    }
`;

const TransactionsBox = styled.div`
    width: calc(100vw - 50px);
    height: calc(100vh - 251px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 78px;
    background: #FFFFFF;
    border-radius: 5px 5px 0 0;
    position: relative;
    overflow: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar{
        width: 0;
    }
`;

const TotalAmount = styled.div`
    width: calc(100vw - 50px);
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    margin-bottom: 13px;
    border-radius: 0 0 5px 5px;
    h1 {
        font-family: Raleway;
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        margin-left: 15px;
        margin-bottom: 15px;
        margin-top: 10px;
    }
    h2 {
        font-family: Raleway;
        font-size: 16px;
        line-height: 19px;
        color: green;
        margin-right: 15px;
        margin-bottom: 15px;
        margin-top: 10px;
    }
`;

const TransactionDescription = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    margin-top: 5px;
    margin-bottom: 5px;
`;

const Date = styled.div`
    width: 15%;
    font-family: Raleway;
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
    margin-left: 2.5%;
    margin-right: 2.5%;
`;

const Description = styled.div`
    width: 55%;
    font-family: Raleway;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`;

const Value = styled.div`
    width: 22%;
    display: flex;
    justify-content: flex-end;
    font-family: Raleway;
    font-size: 16px;
    line-height: 19px;
    color: ${(props)=>(props.category === 1 ? 'green' : 'red' )};
    margin-right: 3%;
`;

const EmptyTransactionsBox = styled.h1`
    margin: auto 0;
    font-family: Raleway;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`;

const EntriesBox = styled.div`
    width: calc(100vw - 50px);
    height: 100px;
    display: flex;
    justify-content: space-between;
`;

const EntryButton = styled.button`
    width: calc(50% - 7.5px);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px;
    background: lightgreen;
    border: none;
    border-radius: 5px;
    background: #A328D6;
    cursor: pointer;
    h1 {
        font-family: Raleway;
        font-size: 20px;
        font-weight: 700;
        line-height: 23px;
        color: #FFFFFF;
        max-width: 20px;
    }
`;