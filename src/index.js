
import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter } from 'react-router-dom';
import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import "flag-icons/css/flag-icons.min.css";

import App from './App.js';
import './index.css';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs:['en','fr','ar'],
    fallbackLng: "en",
    detection:{
      order: [ 'cookie','localStorage','path', 'querystring','htmlTag', 'subdomain'],
      caches:['cookie','localStorage']
    },
    backend:{
      loadPath:'/assets/local/{{lng}}/translation.json'
    }
  });

const loading =(
  <div className='py-4 text-center'>
    <h2>Loading...</h2>
  </div>
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={loading}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
