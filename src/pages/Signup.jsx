import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading2, purple, white, Input, Button, green, red, titleFont } from '../styles/commonComp';
import loadingGif from '../images/loading-gif.gif';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {doc, setDoc } from 'firebase/firestore';


const Wrapper = styled.div`
  min-height: 100vh;
`;

const LoginCard = styled.div`
  padding: 2rem;
  width: 40rem;
  flex-direction: column;
  gap: 3rem;
  background-color: ${white};
  border-radius: 1.5rem;
  box-shadow: 1.1rem 1.1rem 2.2rem -0.4rem rgba(103,48,236,0.34);
  border: 1px solid rgba(103,48,236,0.34);
  `;

const LoginHeading = styled(Heading2)`
  color: ${purple};
`;

const LoginForm = styled.form`
  flex-direction: column;
  width: 100%;
  gap: 2.3rem;

  span {
    color: ${red};
    font-size: 1.6rem;
  }
`;

const LoginButton = styled(Button)`
  background-color: ${green};
  color: ${white};
`;

const LoadingImg = styled.img`
  width: 2rem;
  margin-right: 1rem;
`;

const Wrapper2 = styled.div`
  width: 100%;
  p {
    font-family: ${titleFont};
    font-size: 1.5rem;
  }
`;

const SignupBtn = styled(Link)`
  text-decoration: none;
  color: ${white};
  font-size: 1.4rem;
  font-family: ${titleFont};
  padding: 0.4rem 1rem;
  background-color: ${green};
  border-radius: 0.4rem;
  margin-left: 2.5rem;
`;

const FileInput = styled(Input)`
  
  &::-webkit-file-upload-button {
    background-color: transparent;
    border: 0;
    color: ${white};
    border: 0.1rem solid ${purple};
    margin-right: 2.5rem;
    cursor: pointer;
    border-radius: 0.5rem;
    visibility: hidden;
    position: relative;
  }

  &::before {
    position: absolute;
    content: "Avatar 👤";
    width: 7.5rem;
    height: 2rem;
    border: 0.1rem solid ${purple};
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;


const Signup = () => {

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (name && email && password) {
      setErr(null)

      setLoading(true);
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        const date = new Date().getTime();
        // creating ref of storage
        const storageRef = ref(storage, `profileImages/${name + date}`);
        // creating ref of user document
        const docRef = doc(db, "users", user.uid);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // updating profile of user
              await updateProfile(user, {
                displayName: name,
                photoURL: downloadURL
              })
              
              // creating a doc for user
              await setDoc(docRef, {
                uid: user.uid,
                displayName: name,
                photoURL: downloadURL,
                email: email,
                following: [],
                followers: []
              })

            } catch (error) {
              setErr(err)
            }
          })
        })

        // console.log(user)
        navigate("/");

      } catch (error) {
        setErr(error.message)
      }
      setLoading(false)


    }

    else {
      setErr("Please fill all fields")
    }


  }


  return (
    <>
      <Wrapper className='d-flex'>
        <LoginCard className='d-flex' >
          <LoginHeading>Register</LoginHeading>

          <LoginForm className='d-flex' onSubmit={e => handelSubmit(e)} >
            <Input type="text" id='name' placeholder='Name' required />
            <Input type="email" id='email' placeholder='@email.com' required />
            <Input type="password" id='password' placeholder='password' required />
            <FileInput placeholder='Add an Avatar' type={'file'} id='file-input' accept="image/*"></FileInput>

            {
              err && <span><strong>Error !!!&nbsp;&nbsp;&nbsp;</strong>{err}</span>
            }

            <LoginButton type="submit" className='d-flex'>
              {loading && <LoadingImg src={loadingGif} alt="" />} Sign Up
            </LoginButton>
          </LoginForm>

          <Wrapper2 className='d-flex' >
            <p>Already have an account ?</p>
            <SignupBtn to='/login'>Login</SignupBtn>
          </Wrapper2>


        </LoginCard>
      </Wrapper>
    </>
  )
}

export default Signup
