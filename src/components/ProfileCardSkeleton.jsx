import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components';
import { white } from '../styles/commonComp';
import { mobile1 } from '../styles/Responsive';


const Wrapper = styled.div`
    width: 85%;
    height: 7.5rem;
    background-color: ${white};
    padding: 1rem;
    box-shadow: 0.8rem 0.8rem 1.6rem -0.4rem #3c3c3c56;
    margin: 0 auto;
    border-radius: 1rem;
    justify-content: space-between;
    ${mobile1({ width: '95%' })}

    .user-info {
        width: 70%;
        display: flex;
    }

    .user-info div {
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
    }

    .profile-img {
        width: 5.5rem;
        height: 5.5rem;
    }
`;


const ProfileCardSkeleton = () => {
    return (
        <>
            <Wrapper className='d-flex' >
                <div className="user-info">
                    <Skeleton className='profile-img' circle={true} highlightColor="#d4abf869" baseColor='#fae6ffcd' />

                    <div>
                        <Skeleton width={'70%'} height={'1.5rem'} highlightColor="#d4abf869" baseColor='#fae6ffcd' />
                        <Skeleton width={'90%'} height={'1.5rem'} highlightColor="#d4abf869" baseColor='#fae6ffcd' />
                    </div>
                </div>

                <Skeleton width={'10rem'} height={'3.5rem'} highlightColor="#d4abf869" baseColor='#fae6ffcd' borderRadius={'0.8rem'} />

            </Wrapper>
        </>
    )
}

export default ProfileCardSkeleton