import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import nextI18nextConfig from '../next-i18next.config';
import dynamic from 'next/dynamic';
const MobileUser = dynamic(() => import('../src/views/MobileUser'))


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
const MobileUserPage = () => {
    return (
    
       <MobileUser/>
      
    )
}

export default MobileUserPage;