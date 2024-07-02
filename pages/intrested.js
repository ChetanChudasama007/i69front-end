import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import nextI18nextConfig from '../next-i18next.config';
import { WelcomeAuth } from '../src/common/welcome';
import dynamic from 'next/dynamic';
const IntrestedIn = dynamic(() => import('../src/views/IntrestedIn'))

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
const Intrested = () => {
    return (
      <IntrestedIn/>
    )
}

Intrested.getLayout = (page) => {

  return(
  <WelcomeAuth>
    {page}
  </WelcomeAuth>
  )
}

export default Intrested;