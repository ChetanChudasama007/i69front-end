
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import nextI18nextConfig from '../next-i18next.config';
import { Authenticated } from '../src/common/middleWare';
import dynamic from 'next/dynamic';
const About = dynamic(() => import('../src/views/About'))

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
const AboutTag = () => {
    return (
      <About/>
    )
}

AboutTag.getLayout = (page) => {

  return(
  <Authenticated>
    {page}
  </Authenticated>
  )
}

export default AboutTag;