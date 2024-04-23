import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProfileLeft from '../components/ProfileLeft';
import ProfileRight from '../components/ProfileRight';
import { mobile1 } from '../styles/Responsive';

const Wrapper = styled.div`
    max-width: 100%;
    height: 90vh;
    ${mobile1({ position: 'relative' })}
`;

const Profile = () => {

    const [openLeft, setOpenLeft] = useState(false);

    const { userID } = useParams();

    return (
        <>
            <Wrapper className='d-flex'>
                <ProfileLeft openLeft={openLeft} userID={userID} />
                <ProfileRight setOpenLeft={setOpenLeft} openLeft={openLeft} userID={userID}/>
            </Wrapper>
        </>
    )
}

export default Profile