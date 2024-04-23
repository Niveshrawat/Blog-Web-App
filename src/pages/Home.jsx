import React from 'react'
import styled from 'styled-components'
import Blogs from '../components/Blogs'
import { Heading1 } from '../styles/commonComp'

export const BlogsHeading = styled(Heading1)`
  padding: 2rem 2rem 2rem 0;
  width: 85%;
  text-align: left;
  margin: 0 auto;
`;

const Home = () => {
  return (
    <>
      <BlogsHeading>Blogs</BlogsHeading>
      <Blogs />
    </>
  )
}

export default Home