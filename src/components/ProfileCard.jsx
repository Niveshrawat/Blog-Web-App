import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase-config';
import { Button, Heading4, purple, titleFont, white } from '../styles/commonComp';
import { mobile1, mobile2 } from '../styles/Responsive';


const ProfileCard = (props) => {
    const { followingCard, displayName, photoURL, email, userID } = props;

    const currentUser = useContext(AuthContext);
    const [currentUserData, setCurrentUserData] = useState(null);
    const [userData, setUserData] = useState(null);
    const currentUserDocRef = doc(db, "users", currentUser.uid);
    const userDocRef = doc(db, "users", userID);


    //! Fetching current user data
    useEffect(() => {
        const unsub = onSnapshot(currentUserDocRef, (doc) => {
            setCurrentUserData(doc.data());
        });

        return () => {
            unsub();
        }

        // eslint-disable-next-line
    }, []);

    //! Fetching data of user 
    useEffect(() => {
        const unsub = onSnapshot(userDocRef, (doc) => {
            setUserData(doc.data());
        });

        return () => {
            unsub();
        }

        // eslint-disable-next-line
    }, []);


    // handle follow
    const handleFollow = async () => {
        if (currentUserData.following.includes(userID)) {
            const index = currentUserData.following.indexOf(userID);
            currentUserData.following.splice(index, 1)

            const index1 = userData.followers.indexOf(currentUser.uid);
            userData.followers.splice(index1, 1);
        }

        else {
            currentUserData.following.push(userID);
            userData.followers.push(currentUser.uid);
        }

        await updateDoc(currentUserDocRef, {
            following: currentUserData.following
        })

        await updateDoc(userDocRef, {
            followers: userData.followers
        })
    }




    

    const Wrapper = styled.div`
        width: ${followingCard ? '95%' : '83%'};
        background-color: ${white};
        padding: 1rem;
        box-shadow: 0.8rem 0.8rem 1.6rem -0.4rem #3c3c3c56;
        margin: 0 auto;
        border-radius: 1rem;
        justify-content: space-between;
        /* border: 2px solid red; */
        ${mobile1({ width: '95%' })}
    `;

    const UserInfo = styled.div`
        width: 70%;
        justify-content: flex-start;
        gap: ${followingCard ? '1.5rem' : '2.5rem'};
    `;

    const Image = styled.img`
        width: ${followingCard ? '5rem' : '6rem'};;
        height: ${followingCard ? '5rem' : '6rem'};;
        object-fit: fill;
        border-radius: 50%;
    `;

    const Wrapper2 = styled.div`
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
        overflow: hidden;
    `;

    const Username = styled(Heading4)`
        font-size: ${followingCard ? '1.6rem' : '2rem'};;
        text-align: left;
    `;

    const UserId = styled.h5`
        color: gray;
        font-family: ${titleFont};
        font-size: ${followingCard ? '1.4rem' : '1.6rem'};
        font-weight: lighter;
    `;

    const FollowBtn = styled(Button)`   
        width: 21%;
        background-color: ${currentUserData?.following.includes(userID) ?  `${white}` : `${purple}`};
        color: ${currentUserData?.following.includes(userID) ?  `${purple}` : `${white}`};
        border: ${currentUserData?.following.includes(userID) ?  `0.1rem solid ${purple}` : '0'};
        gap: ${followingCard ? '0.5rem' : '1rem'};;
        font-size: ${followingCard ? '1.4rem' : '1.8rem'};;
        font-weight: 600;
        ${mobile2({width: '28%'})}
    `;

    return (
        <>
            <Wrapper className='d-flex' >

                <UserInfo className='d-flex link' style={{ width: '70%' }} as={Link} to={`/profile/${userID}`}>
                    <Image src={photoURL} alt="profile-image" onError={e => {e.target.src = "https://cdn-icons-png.flaticon.com/512/4333/4333609.png"}} />

                    <Wrapper2 className='d-flex'>
                        <Username to={`/profile/${userID}`} className='link' >{displayName}</Username>
                        <UserId>{email}</UserId>
                    </Wrapper2>
                </UserInfo>

                <FollowBtn className='d-flex' onClick={handleFollow}>{
                    currentUserData?.following.includes(userID) ? 'Unfollow' : 'Follow'
                }</FollowBtn>

            </Wrapper>
        </>
    )
}

export default ProfileCard