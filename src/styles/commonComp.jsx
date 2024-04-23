import styled from "styled-components";

// Fonts
export const paraFont = "'Archivo', sans-serif";
export const headingFont = "'Libre Baskerville', serif";
export const titleFont = "'Ubuntu', sans-serif";


// Colors
export const darkPurple = "#410179";
export const purple = "#62d";
export const lightPurple = "#8690ef";
export const black = "#131313";
export const white = "#fffefe";
export const green = "#42c349";
export const red = "tomato"


export const Heading1 = styled.h1`
    font-size: 5.3rem;
    color: ${darkPurple};
    text-align: center;
    font-family: ${headingFont};
`;

export const Heading2 = styled.h2`
    font-size: 4rem;
    color: ${black};
    text-align: center;
    font-family: ${headingFont};
`;

export const Heading3 = styled.h3`
    font-size: 3.8rem;
    color: ${black};
    text-align: center;
    font-family: ${headingFont};
`;

export const Heading4 = styled.h4`
    font-size: 3.2rem;
    color: ${black};
    text-align: center;
    font-family: ${titleFont};
`;

export const Heading5 = styled.h5`
    font-size: 2.5rem;
    color: ${darkPurple};
    text-align: center;
    font-family: ${titleFont};
`;

export const Input = styled.input`
  outline: 0;
  border: 0;
  border-bottom: 0.2rem solid ${purple};
  font-family: ${titleFont};
  width: 100%;
  font-size: 1.6rem;
  padding: 0.5rem;
  color: ${black};
`;

export const PageHeading = styled(Heading2)`
    text-align: left;
    color: ${darkPurple};
    width: 70%;
    margin: 2.5rem auto;
`;

export const Button = styled.button`
    border: 0;
    padding: 0.7rem 1.5rem;
    background-color: ${green};
    color: ${white};
    font-family: ${titleFont};
    font-size: 1.7rem;
    cursor: pointer;
    border-radius: 0.8rem;
`;

export const Para = styled.p`
  color: ${black};
  font-size: 1.5rem;
  word-wrap: break-word;
  line-break: strict;
  font-family: ${paraFont};
`;