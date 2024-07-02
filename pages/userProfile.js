import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import nextI18nextConfig from '../next-i18next.config';
import PrivatLayout from '../src/layouts/PrivatLayout';
import dynamic from 'next/dynamic';
const UserProfileView = dynamic(() => import('../src/views/UserProfile'))

export async function getServerSideProps({ locale }) {
    if (locale) {
        return {
            props: {
                ...(await serverSideTranslations(
                    locale,
                    ['translation'],
                    nextI18nextConfig
                ))
            }
        }
    }
}
const UserProfile = () => {
    return (
        <PrivatLayout>
            <UserProfileView />
        </PrivatLayout>
    )
}

export default UserProfile;