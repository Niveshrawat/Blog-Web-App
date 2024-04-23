import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading2, purple, white, Input, Button, green, red, titleFont, Heading5, paraFont, darkPurple} from '../styles/commonComp';
import loadingGif from '../images/loading-gif.gif';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const LoginCard = styled.div`
  padding: 2rem;
  width: 40rem;
  flex-direction: column;
  gap: 2.5rem;
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
  gap: 2rem;

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

const DemoUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  h5 {
    text-align: left;
    padding: 0 3rem;
    font-size: 2rem;
  }

  span, h6 {
    font-family: ${paraFont};
    color: ${darkPurple};
  }
  
  span {
    font-size: 1.8rem;
    padding: 0 0.7rem;
  }
  
  h6 {
    color: #646464;
    padding: 0 5rem;
    font-size: 1.5rem;
  }
`;

const Login = () => {

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email && password) {
      setErr(null)

      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
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
          <LoginHeading>Login</LoginHeading>

          <LoginForm className='d-flex' onSubmit={e => handelSubmit(e)}  >
            <Input type="email" id='email' placeholder='@email.com' />
            <Input type="password" id='password' placeholder='password' />

            {
              err && <span><strong>Error !!!&nbsp;&nbsp;&nbsp;</strong>{err}</span>
            }

            <LoginButton type="submit" className='d-flex'>
              {loading && <LoadingImg src={loadingGif} alt="" />} Login
            </LoginButton>
          </LoginForm>

          <DemoUser>
            <Heading5>Demo User</Heading5>
            <h6><span>Email:</span>ironman@gmail.com</h6>
            <h6><span>Password:</span>imironman</h6>
          </DemoUser>

          <Wrapper2 className='d-flex' >
            <p>Not Registered Yet ? </p>
            <SignupBtn to='/signup'>Sign up</SignupBtn>
          </Wrapper2>


        </LoginCard>
      </Wrapper>
    </>
  )
}

export default Login