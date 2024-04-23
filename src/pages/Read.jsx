import React, { useEffect } from 'react';
import styled from 'styled-components';
import { black, Heading3, Heading4, Para, white, Button } from '../styles/commonComp';
import { GoVerified } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';

const Wrapper = styled.div`
    margin: 3rem auto;
    width: 80%;
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;
    background-color: ${white};
    border-radius: 1.5rem;
    box-shadow: 1.1rem 1.1rem 2.2rem -0.4rem rgba(103,48,236,0.34);
    border: 1px solid rgba(103,48,236,0.34);
`;

const Image = styled.img`
    width: 50%;
`;

const UserName = styled(Heading4)`
    width: 100%;
    text-align: left;
    padding-left: 5%;
    font-size: 2.2rem;
    .verify {
        margin-left: 0.5rem;
        font-size: 1.5rem;
        color: #0072e4;
    }
`;

const Title = styled(Heading3)`
    color: ${black};
    text-align: left;
    font-size:  2.8rem;
`;

const Content = styled(Para)`
    font-size: 1.7rem;
    text-align: center;
    word-wrap: break-word;
`;

const BackButton = styled(Button)`
    background-color: tomato;
    margin: 2rem 0  0 4rem ;

`;

const Read = () => {

    const location = useLocation();
    const blogData = location.state;

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    return (
        <>
            <BackButton onClick={e => window.history.back()} >Back</BackButton>
            <Wrapper className='d-flex' >
                <UserName as={Link} to={`/profile/${blogData.adminID}`} className="link">Posted by:&nbsp;
                {blogData.adminName}<GoVerified className='verify' /></UserName>
                <Image src={blogData.image} onClick={e => window.open(e.target.src, "_blank")} />

                <Title>{blogData.title}</Title>

                <Content>{blogData.content}</Content>
            </Wrapper>

        </>
    )
}

export default Read