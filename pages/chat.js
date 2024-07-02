import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import nextI18nextConfig from '../next-i18next.config';
import { Authenticated } from '../src/common/middleWare';
import dynamic from 'next/dynamic';
const HomePage = dynamic(() => import('../src/views/Home'))

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
const Home = () => {
    return (
        <HomePage />
    )
}

Home.getLayout = (page) => {

  return(
  <Authenticated>
    {page}
  </Authenticated>
  )
}

export default Home;