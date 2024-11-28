import { createGlobalStyle } from "styled-components";
import { roboto } from "./fonts";

const GlobalStyles = createGlobalStyle`
  body{
    padding: 0;
    margin: 0;
    font-family: ${roboto.style.fontFamily}, sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />;
    </>
  );
}
