import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components';
import { white } from '../styles/commonComp';
import { mobile1 } from '../styles/Responsive';

const Card = styled.div`
    width: 73%;
    margin: 0 auto;
    height:  25rem;
    background-color: ${white};
    border-radius: 1.2rem;
    box-shadow: 1rem 1rem 2rem -0.4rem rgba(103,48,236,0.34);
    border: 1px solid rgba(103,48,236,0.34);
    padding: 2rem;
    justify-content: flex-end;
    position: relative;
    ${mobile1({ height: '50rem', position: 'static', flexDirection: 'column', width: '95%', justifyContent: 'space-between' })};
    

    .left {
        width: 25%;
        height: 85%;
        position: absolute;
        left: -5rem;
        border: 1px solid rgba(103,48,236,0.34);
        border-radius: 1rem;
        ${mobile1({ height: '50%', position: 'static', width: '80%', objectFit: 'center' })};
    }

    .right {
        width: 75%;
        height:100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        ${mobile1({ height: '48%', width: '95%' })};
    }

    .date {
        height: '1.3rem';
        width: 25%;
    }

    .username {
        height: 2.1rem;
        width: 40%;
    }

    .title {
        height: 2.5rem;
        width: 70%;
        margin: 0 auto;
        display: block;
    }

    .read-btn {
        height: 3rem;
        width: 12%;
    }

`;


const BlogSkeleton = () => {
    return (
        <>
            <Card className='d-flex'>
                <div className='left image'>
                    <Skeleton height={'100%'} width={'100%'} borderRadius={'1rem'} highlightColor="#d4abf869" baseColor='#fae6ffea'  /></div>

                <div className='right'>
                    <Skeleton className='date' highlightColor="#d4abf869" baseColor='#fae6ffcd' />
                    <Skeleton className='username' highlightColor="#d4abf869" baseColor='#fae6ffcd'/>
                    <Skeleton className='title' highlightColor="#d4abf869" baseColor='#fae6ffcd'/>
                    <Skeleton count={5} height={'1.4rem'} highlightColor="#d4abf869" baseColor='#fae6ffcd'/>
                    <Skeleton className='read-btn' borderRadius={'2.5rem'} highlightColor="#d4abf869" baseColor='#fae6ffcd' />
                </div>
            </Card>
        </>
    )
}

export default BlogSkeleton