import styled from 'styled-components';

export default function HomePage() {
    return(
        <Body>
            <Title>HomePage</Title>
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

const Title = styled.h1`
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
    margin-bottom: 30px;
`;