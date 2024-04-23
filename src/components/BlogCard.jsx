import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { black, Button, Heading3, Heading4, lightPurple, Para, paraFont, purple, titleFont, white } from '../styles/commonComp';
import { GoVerified } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { mobile1 } from '../styles/Responsive';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { BsCheckLg } from "react-icons/bs";     // , BsHeartFill
import { Link } from 'react-router-dom';

const BlogCard = (props) => {

    const { profileBlog, title, content, image, adminName, adminID, date, likes, docID } = props;
    const currentUser = useContext(AuthContext);
    const docRef = doc(db, "blogs", docID);
    const [edit, setEdit] = useState(false);
    // const [appearHeart, setAppearHeart] = useState(false);
    const myTitle = useRef();
    const myContent = useRef();
    const blogData = {
        adminID, adminName, image, title, content
    }

    //! Handle Edit 
    const handleEdit = async () => {
        setEdit(!edit);

        if (edit) {
            if (myTitle.current.innerText && myContent.current.innerText) {
                
                await updateDoc(docRef, {
                    title: myTitle.current.innerText,
                    content: myContent.current.innerText
                })
            }

            else {
                alert("Please fill both fields");
                setEdit(true);
            }
        }

    }

    //! Handle Likes 
    const handleLike = async () => {
        if (likes.includes(currentUser.uid)) {
            const index = likes.indexOf(currentUser.uid);
            likes.splice(index, 1)
        }

        else {
            likes.push(currentUser.uid)
        }
        
        // setAppearHeart(true);
        // setTimeout(() => {
        //     setAppearHeart(false);
        // }, 700);

        await updateDoc(docRef, {
            likes: likes
        })
    }

    //! Handle delete 
    const handleDelete = async () => {
        if (window.confirm(`Do you want delete ${title} blog ?`)) await deleteDoc(docRef);
    }



    const Card = styled.div`
        width: ${profileBlog ? '73%' : '80%'};
        height:  ${profileBlog ? '24rem' : '27rem'};
        background-color: ${white};
        border-radius: 1.2rem;
        box-shadow: 1rem 1rem 2rem -0.4rem rgba(103,48,236,0.34);
        border: 1px solid rgba(103,48,236,0.34);
        padding:  ${profileBlog ? '0.8rem' : '1.5rem'};
        position: relative;
        justify-content: flex-end;
        
        ${mobile1({ height: '55rem', position: 'static', flexDirection: 'column', width: `${profileBlog ? '95%' : '95%'}`, justifyContent: 'space-between' })};

        @keyframes heartAnimation {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        .appear-heart {
            color: #fb3958;
            font-size: 10rem;
            position: absolute;
            left: 50%;
            top: 50%;
            animation: heartAnimation 0.5s ease-in-out;
            opacity: 0;
            z-index: 5;
        }


    `;

    const Image = styled.img`
        width:  ${profileBlog ? '27%' : '24.5%'};
        height: 85%;
        object-fit: fill;
        position: absolute;
        left: -5rem;
        border-radius: 0.6rem;
        transition: all 0.3s ease-in-out;
        box-shadow: 0.8rem 0.8rem 2rem -0.4rem #34343a55;
        background-color: white;
        
        &:hover {
            transform: scale(1.05);
        }

        ${mobile1({ height: '50%', position: 'static', width: `${profileBlog ? '80%' : '80%'}`, objectFit: 'center' })};
    `;

    const ContentBox = styled.div`
        flex-direction: column;
        align-items: flex-start;
        width: 78%;
        padding: 0.5rem;
        padding-bottom: 0;
        gap:  ${profileBlog ? '0.3rem' : '0.5rem'};
        ${mobile1({ height: '48%', width: '95%' })};
    `;

    const Date = styled.span`
        font-size: ${profileBlog ? '1.3rem' : '1.4rem'};
        color: #646464;
        font-family: ${paraFont};
    `;

    const UserName = styled(Heading4)`
        font-size: ${profileBlog ? '1.9rem' : '2.2rem'};
        .verify {
            margin-left: 0.5rem;
            font-size: 1.5rem;
            color: #0072e4;
        }
    `;

    const Title = styled(Heading3)`
        max-height: 3.45rem;
        color: ${black};
        font-size:  ${profileBlog ? '2.1rem' : '2.5rem'};
        overflow: hidden;
        margin: 0.5rem 0 0.2rem 0;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        outline: 0;
        padding-top: 0.2rem;
        border-top: 0.1rem solid ${lightPurple};
        border: ${edit && `0.1rem solid ${lightPurple}`};
    `;

    const ReadBtn = styled(Button)` 
        color: ${white};
        background-color: ${purple};
        padding: 0.6rem 1.7rem;
        font-size:  ${profileBlog ? '1.4rem' : '1.6rem'};
        border-radius: 2.5rem;
        transition: all 0.3s ease-in-out;
        &:hover {
            transform: scale(1.05);
        }
    `;

    const Content = styled(Para)`
        width: 100%;
        padding: 0.5rem;
        height:  ${profileBlog ? '7rem' : '8rem'};
        max-height:  ${profileBlog ? '7rem' : '8rem'};
        overflow: hidden;
        margin:  ${profileBlog ? '0.3rem 0' : '0.5rem 0'};
        font-size: ${profileBlog && '1.6rem'};
        border-bottom: 0.1rem solid ${lightPurple};
        outline: 0;
        border: ${edit && `0.1rem solid ${lightPurple}`};
        /* border: 2px solid red; */
        position: relative;

        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 1rem;
            left: 0;
            bottom: 0;
            background-color: ${white};
            opacity: 0.7;
        }

        
    `;

    const Footer = styled.footer`
        width: 100%;
        padding: 0 2rem;
        /* border: 2px solid blue; */
        justify-content: space-between;
        margin-top: 0.5rem;
    `;

    const FooterBtn = styled.button`
        border: 0;
        background-color: transparent;
        font-size: 2.45rem;
        cursor: pointer;
        .f-i {transition: all 0.3s ease-in-out}
        &:hover .f-i {
            transition: all 0.3s ease-in-out;
            transform: scale(1.24);
        }
        span {
            color: #fb3958;
            margin-right: 0.5rem;
            font-size: 1.5rem;
            font-family: ${titleFont};
        }
    `;

    return (
        <>
            <Card className='d-flex' onDoubleClick={handleLike} >
                <Image src={image} onclick={e => {window.open(e.target.src, '_blank')}} />

                {/* {appearHeart && <BsHeartFill className='appear-heart'/>} */}

                <ContentBox className='d-flex' >
                
                    <Date>{date}</Date>
                    <UserName as={Link} to={`/profile/${adminID}`} className="link">{adminName}<GoVerified className='verify' /></UserName>

                    <Title contentEditable={edit} suppressContentEditableWarning={true} ref={myTitle}>{title}</Title>
                    <Content contentEditable={edit ? 'true' : 'false'} suppressContentEditableWarning={true} id="content" ref={myContent}>{content}</Content>

                    <ReadBtn as={Link} to={`/read/${docID}`} state={blogData}>Read</ReadBtn>

                    <Footer className='d-flex'>
                        <FooterBtn className='d-flex' title='Like'>
                            <span>{likes.length}</span>

                            {
                                likes.includes(currentUser.uid) ? <AiFillHeart style={{ color: "#fb3958" }} className="f-i" onClick={handleLike} />
                                    :
                                    <AiOutlineHeart style={{ color: "#fb3958" }} className="f-i" onClick={handleLike} />
                            }

                        </FooterBtn>

                        {
                            currentUser.uid === adminID &&

                            <FooterBtn className='d-flex' title='Edit' onClick={handleEdit}>
                                {
                                    !edit ? <FaPencilAlt style={{ color: "#1be37b" }} className="f-i" /> : <BsCheckLg style={{ color: "#1be37b" }} className="f-i" />
                                }
                            </FooterBtn>
                        }

                        {currentUser.uid === adminID && <FooterBtn className='d-flex' title='Delete' onClick={handleDelete}><MdDelete style={{ color: "#f13245" }} className="f-i" /></FooterBtn>}
                    </Footer>

                </ContentBox>
            </Card>
        </>
    )
}

export default BlogCard