import React from 'react';
import styled from 'styled-components';
import { darkPurple, Heading3 } from '../styles/commonComp';
import BlogCard from './BlogCard';
import { FaUserCheck } from "react-icons/fa";
import { mobile1 } from '../styles/Responsive';
import { useContext } from 'react';
import { BlogsContext } from '../context/BlogsContext';
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';
import BlogSkeleton from './BlogSkeleton';

const RightBox = styled.div`
    width: 68%;
    height: inherit;
    ${mobile1({ width: '100%', height: '97vh', position: 'absolute', top: '0', left: '0' })}
`;

const Header = styled.header`
    height: 6rem;
    padding: 0 4rem;
    border-bottom: 0.2rem solid ${darkPurple};
    justify-content: space-between;
    gap: 1.5rem;
    
    

    h3 {
        text-align: left;
        color: ${darkPurple};
        /* ${mobile1({ paddingLeft: '4rem', borderLeft: `0.2rem solid ${darkPurple}` })} */
        z-index: 2;
    }

    .create-blog-link, .following-icon {
        font-size: 3rem;
        color: ${darkPurple};
        cursor: pointer;
    }

    .following-icon {
        z-index: 99 ;
        display: none;
        ${mobile1({ display: 'block' })}
    }

    
`;

const BlogsContainer = styled.div`
    width: 100%;
    z-index: 2;
    height: calc(90vh - 6rem);
    ${mobile1({ height: 'calc(97vh - 6rem)' })}
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.8rem;
        /* display: none; */
    }
  
    &::-webkit-scrollbar-thumb {
        border-radius: 0.5rem;
        background-color: ${darkPurple};
        border: 0.2rem solid #dafcfc;
    }

    ${mobile1({ width: '85%', margin: '0 auto' })}
`;

const Wrapper = styled.div`
    margin: 3.5rem 0;
`;


const ProfileRight = (props) => {

    const { setOpenLeft, openLeft, userID } = props;
    const blogs = useContext(BlogsContext);
    const array = Array(3).fill(0);

    return (
        <>
            <RightBox>
                <Header className='d-flex' >
                    <FaUserCheck className='following-icon' onClick={e => setOpenLeft(!openLeft)} />
                    <Heading3>{ } Blogs</Heading3>
                    <Link to="/create-blog"><FiEdit className='create-blog-link' /></Link>

                </Header>

                {
                    !blogs.length ?
                        <BlogsContainer>
                            {
                                array.map((ele, i) => (
                                    <Wrapper key={i}><BlogSkeleton /></Wrapper>
                                ))

                            }
                        </BlogsContainer>

                        :


                        <BlogsContainer >
                            {
                                blogs.map((ele) => {
                                    return (
                                        ele.adminID === userID && <Wrapper key={ele.id} className='d-flex'>
                                            <BlogCard profileBlog={true} title={ele.title} content={ele.content} image={ele.image} adminName={ele.adminName} adminID={ele.adminID} date={ele.date}
                                                likes={ele.likes} docID={ele.id} />
                                        </Wrapper>

                                    )
                                })
                            }

                        </BlogsContainer>
                }
            </RightBox>
        </>
    )
}

export default ProfileRight