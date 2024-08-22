// pages/_app.tsx
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { store } from '@/store';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    }, []);

    return (
        <>
            <Head>
                <title>Good Deeds App Ezrababait</title>
                <meta name="description" content="An application for tracking and sharing good deeds"/>
                <link rel="icon" href="/chat.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    );
}

export default MyApp;
