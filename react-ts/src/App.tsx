import React from 'react';
import logo from './logo.svg';
import './App.css';
import { cookieApiClient } from './api/cookieApi';
import Cookies from 'js-cookie';

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={setCookieHandler}>setCookie</button>
        <button onClick={getCookieHandler}>getCookie</button>
      </header>
    </div>
  );
}

export default App;
