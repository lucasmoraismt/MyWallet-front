import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
}
body {
    font-family: 'Raleway', sans-serif;
    background-color: #935ABD;
    color: #FFFFFF;
}
button,
input,
textarea
{
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
}
input, .accountingText {
    color: #000000;
}
button {
    cursor: pointer;
}
`;

export default GlobalStyle;
