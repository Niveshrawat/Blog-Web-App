import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { black, darkPurple, Heading4, Heading5, Input, lightPurple, titleFont, white } from '../styles/commonComp';
import { BsFillPencilFill } from "react-icons/bs";
import ProfileCard from '../components/ProfileCard';
import { mobile1 } from '../styles/Responsive';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
// import infinityGif from '../images/infinity-gif.gif';
import { updateProfile } from 'firebase/auth';
import { UsersContext } from '../context/UsersContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ProfileCardSkeleton from './ProfileCardSkeleton';

const LeftBox = styled.div`
    width: 32%;
    height: inherit;
    border: 0;
    border-right: 0.2rem solid ${darkPurple};
    padding: 0.5rem;
    transition: all 0.3s ease-in-out;
    z-index: 3;
    ${mobile1({ position: 'absolute', width: '100%', backgroundColor: `${lightPurple}`, left: '-100%', height: '100vh', top: '0' })}
`;

const UserInfo = styled.div`
    width: 100%;
    justify-content: space-between;
    padding: 0 1.5rem;
    gap: 1rem;
    height: 15rem;
    ${mobile1({ gap: '2rem', height: '28rem', marginBottom: '2rem', flexDirection: 'column', justifyContent: 'center' })}
`;

const UserNameBox = styled.div`
    flex-direction: column;
    width: 65%;
    gap: 0.5rem;
    ${mobile1({ height: '8rem', width: '80%' })}

    div {
        width: 100%;
        gap: 1.5rem;
    }
`;

const Image = styled.img`
    width: 12rem;
    height: 12rem;
    object-fit: fill;
    border-radius: 1rem;
    border: 0.1rem solid ${darkPurple};
    ${mobile1({ height: '13rem', width: '13rem' })}
`;

const UserName = styled(Heading4)`
    font-size: 2.3rem;
    max-width: 85%;
    overflow: hidden;
    text-align: center;
    ${mobile1({ color: `${white}`, fontSize: '2.8rem' })}
`;

const EditBtn = styled.button`
    padding: 0.5rem 0.7rem;
    cursor: pointer;
    color: ${black};
    background-color: #ffc107;
    border: 0;
    border-radius: 0.7rem;
    .edit-icon {
        font-size: 1.6rem;
    }
    ${mobile1({ height: '3.5rem' })}
`;

const UserId = styled.h5`
    color: #494949;
    font-family: ${titleFont};
    font-size: 1.7rem;
    font-weight: lighter;
    margin-bottom: 0.5rem;
    ${mobile1({ color: `${white}` })}
    ${mobile1({ fontSize: '2rem' })}
`;

const SearchBox = styled.div`
    height: calc(90vh - 24rem);
    padding: 1rem;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.8rem;
    }
  
    &::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        background-color: ${darkPurple};
        border: 0.2rem solid #f9e7fe;
    }
`;

const FollowingCard = styled.div`
    margin: 1.5rem 0;
    ${mobile1({ margin: '2.3rem 0' })}
`;


const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    ${mobile1({ padding: '2rem 3rem' })}
    h5 {
        padding: 0 0.5rem;
        font-size: 1.8rem;
        cursor: pointer;
    }
`;


const ProfileLeft = (props) => {
    const { openLeft, userID } = props;
    const currentUser = useContext(AuthContext);
    const users = useContext(UsersContext);
    const [userData, setUserData] = useState(null)
    const docRef = doc(db, "users", userID);
    const [search, setSearch] = useState("");
    const [follow, setFollow] = useState("followers");
    const array = Array(5).fill(0);


    //! Fetching data of  userID data
    useEffect(() => {

        const unsub = onSnapshot(docRef, (doc) => {
            // console.log(doc.data().following);
            setUserData(doc.data());
        });

        return () => {
            unsub();
        }
        // eslint-disable-next-line
    }, [userID]);

    //! edit name
    const handleEdit = async () => {
        const newName = prompt("Enter new name");

        if (newName) {
            await updateProfile(currentUser, {
                displayName: newName
            })

            await updateDoc(docRef, {
                displayName: newName
            })
            window.location.reload();
        }

        else {
            alert("Name can'nt be empty")
        }
    }

    return (
        <>
            <LeftBox className={`${openLeft ? 'open-left' : ''}`} >

                <UserInfo className='d-flex'>
                    {
                        userData ? <Image src={userData.photoURL} alt="profile-image" onClick={e => window.open(e.target.src, "_blank")} onError={e => {e.target.src = "https://cdn-icons-png.flaticon.com/512/4333/4333609.png"}} />:
                        <Skeleton width={'12rem'} height={'12rem'} highlightColor="#d4abf869" baseColor='#fae6ffd7' />
                    }

                    <UserNameBox className='d-flex'>
                        <div className='d-flex' >

                            <UserName>{ userData ? userData.displayName: <Skeleton width={'15rem'} height={'1.8rem'} highlightColor="#d4abf869" baseColor='#fae6ffd7' /> }</UserName>

                            {currentUser.uid === userData?.uid && <EditBtn title='Edit'><BsFillPencilFill className='edit-icon' onClick={handleEdit} /></EditBtn>}
                        </div>

                        <UserId>{ userData ? userData.email:  <Skeleton width={'15rem'} height={'1.8rem'} highlightColor="#d4abf869" baseColor='#fae6ffd7' />}</UserId>
                    </UserNameBox>
                </UserInfo>

                <Nav>
                    <Heading5 onClick={e => setFollow("followers")} style={{ borderBottom: `${follow === 'followers' ? '0.2rem solid #410179' : ''}` }} >Followers {userData?.followers.length} </Heading5>

                    <Heading5 onClick={e => setFollow("following")} style={{ borderBottom: `${follow === 'following' ? '0.2rem solid #410179' : ''}` }}>Following {userData?.following.length}</Heading5>

                </Nav>

                <Input type="text" placeholder={`Search ${follow}`} style={{ width: '95%', margin: '0 auto', display: 'block' }} value={search} onChange={e => setSearch(e.target.value)} />

                <SearchBox >

                    {
                        follow === 'following' ?

                            !userData ? array.map((ele, i) => (<FollowingCard key={i}> <ProfileCardSkeleton/></FollowingCard> )) : 

                            users?.filter((e) => e.displayName.toLowerCase().includes(search.toLowerCase())).map((ele) => {
                                return (
                                    // agar userData ki following m ele ki uid ha to use show karo
                                    userData.following.includes(ele.uid) &&
                                    <FollowingCard key={ele.id}>
                                        <ProfileCard followingCard={true} displayName={ele.displayName} photoURL={ele.photoURL} email={ele.email} userID={ele.uid} />
                                    </FollowingCard>
                                )
                            })

                            :

                            !userData ? array.map((ele, i) => (<FollowingCard key={i}> <ProfileCardSkeleton/></FollowingCard> )) : 
                            users?.filter((e) => e.displayName.toLowerCase().includes(search.toLowerCase())).map((ele) => {
                                return (
                                    // agar userData ki followers m ele ki uid ha to use show karo
                                    userData.followers.includes(ele.uid) &&
                                    <FollowingCard key={ele.id}>
                                        <ProfileCard followingCard={true} displayName={ele.displayName} photoURL={ele.photoURL} email={ele.email} userID={ele.uid} />
                                    </FollowingCard>
                                )
                            })

                    }

                </SearchBox>

            </LeftBox>
        </>
    )
}

export default ProfileLeft