import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../firebase-config';
import { black, Button, green, Heading4, Input, PageHeading, purple, titleFont, white } from '../styles/commonComp';
import { mobile1 } from '../styles/Responsive';
import loadingGif from '../images/loading-gif.gif';
import { BsCheckLg } from "react-icons/bs";
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';


const CreateBlogForm = styled.form`
    width: 70%;
    background-color: ${white};
    border-radius: 1.2rem;
    box-shadow: 1rem 1rem 2rem -0.4rem rgba(103,48,236,0.34);
    margin: 1.5rem auto;
    padding: 3rem;
    flex-direction: column;
    gap: 4rem;

    .input {
        width: 100%;
    }
    ${mobile1({ width: '90%' })}
`;

const Label = styled.label`
    /* border: 2px solid blue; */
    font-size: 1.8rem;
    width: 100%;
    font-family: ${titleFont};
    color: ${black};
    display: block;
    margin-bottom: 0.5rem ;
    ${mobile1({ marginBottom: '0.8rem' })}
`;

const LoadingImg = styled.img`
  width: 2rem;
  margin-right: 1rem;
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
    content: "Image 🏞️";
    width: 8.3rem;
    height: 2rem;
    padding: 0.1rem;
    border: 0.1rem solid ${purple};
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const PublishedHeading = styled(Heading4)`
    font-size: 2.2rem;
    color:${green};
    gap: 1.5rem;
    
    i {
        font-size: 1.3rem;
        color:${green};
    }

`


const CreateBlog = () => {

    const currentUser = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target[0].value;
        const content = e.target[1].value;
        const file = e.target[2].files[0];
        const date = new Date();
        const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
        const storageRef = ref(storage, `blogsImages/${title + date.getTime()}`);
        const colRef = collection(db, "blogs");

        setLoading(true);
        setPublished(false);
        await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                    await addDoc(colRef, {
                        title: title,
                        content: content,
                        image: downloadURL,
                        adminName: currentUser.displayName,
                        adminID: currentUser.uid,
                        date: today,
                        likes: []
                    })

                } catch (error) {
                    console.log(error.message)
                }
            })
        });
        setPublished(true);
        setTimeout(() => {
            setPublished(false);
            navigate("/");
        }, 1500);


        setLoading(false);

        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].files[0] = null;

    }


    return (
        <>
            <PageHeading>Create Blog</PageHeading>
            <CreateBlogForm className='d-flex' onSubmit={e => handleSubmit(e)} >

                <div className='input'>
                    <Label htmlFor="title">Title of blog: </Label>
                    <Input type="text" placeholder='Title...' id="title" required />
                </div>

                <div className='input'>
                    <Label htmlFor="content">Content of blog: </Label>
                    <Input as={"textarea"} placeholder='Content...' id="content" cols="30" rows="5" required></Input>
                </div>

                <FileInput placeholder='Add an Avatar' type={'file'} id='file-input' accept="image/*" required></FileInput>

                {published && <PublishedHeading className='d-flex' >Published <BsCheckLg /> </PublishedHeading>}

                <Button type='submit' className='d-flex' >
                    {loading && <LoadingImg src={loadingGif} alt="" />}Publish
                </Button>

            </CreateBlogForm>
        </>
    )
}

export default CreateBlog