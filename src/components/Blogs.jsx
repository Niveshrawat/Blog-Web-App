import React from 'react';
import styled from 'styled-components';
import BlogCard from './BlogCard';
import { useContext } from 'react';
import { BlogsContext } from '../context/BlogsContext';
import BlogSkeleton from './BlogSkeleton';

const Wrapper = styled.div`
    flex-direction: column;
    gap: 3.5rem;
    min-height: 85vh;
    width: 85%;
    margin: 0 auto;
    padding: 3rem;
`;

const Blogs = () => {

    const blogs = useContext(BlogsContext);
    const array = Array(6).fill(0);

    return (
        <>

            {!blogs.length ?
                <Wrapper className='d-flex'>
                    {
                        array.map((ele, i) => (
                            <BlogSkeleton key={i} />
                        ))
                    }
                </Wrapper>
                :
                <Wrapper className='d-flex' >
                    {

                        blogs.map((ele) => {
                            return (
                                <BlogCard key={ele.id} title={ele.title} content={ele.content} image={ele.image} adminName={ele.adminName} adminID={ele.adminID} date={ele.date}
                                    likes={ele.likes} docID={ele.id} />
                            )
                        })
                    }
                </Wrapper>}
        </>
    )
}

export default Blogs