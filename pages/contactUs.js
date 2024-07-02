import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import nextI18nextConfig from '../next-i18next.config';
import dynamic from 'next/dynamic';
const ContactUs = dynamic(() => import('../src/views/ContactUs'))

export async function getServerSideProps({locale}){
    if(locale){
      return{
        props:{
          ...(await serverSideTranslations(
            locale,
            ['translation'],
            nextI18nextConfig
          ))
        }
      }
    }
  }
const Contact = () => {
    return (
        <ContactUs />
    )
}

export default Contact;