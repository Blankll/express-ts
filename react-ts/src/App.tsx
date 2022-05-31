import React from 'react';
import logo from './logo.svg';
import './App.css';
import { cookieApiClient } from './api/cookieApi';
import Cookies from 'js-cookie';
import {googleApiClient} from "./api/googleApi";

function App() {
  const setCookieHandler = async () => {
    await cookieApiClient.setCookie();
  };
  const getCookieHandler = async () => {
    await cookieApiClient.getCookie();
    console.log(Cookies.get('strictCookie'));
    console.log(Cookies.get('laxSiteCookie'));
    console.log(Cookies.get('laxUnsecureSiteCookie'));
    console.log(Cookies.get('noneSecureSiteCookie'));
    console.log(Cookies.get('noneSiteCookie'));
 }
 const googleUrl = 'https://www.google.com';
 const requestGoogleHandler = async () => {
    await googleApiClient.sentRequest();
 }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={setCookieHandler}>setCookie</button>
        <button onClick={getCookieHandler}>getCookie</button>
        <button onClick={requestGoogleHandler}>getGoogle</button>
        <a href={googleUrl}> navigate to google</a>
      </header>
    </div>
  );
}

export default App;
