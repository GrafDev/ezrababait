import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { store, RootState, AppDispatch } from '@/store';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { autoLogin, setToken } from '@/store/authSlice';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Good Deeds App Ezrababait</title>
                <meta name="description" content="An application for tracking and sharing good deeds"/>
                <link rel="icon" href="/chat.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Provider store={store}>
                <AuthWrapper>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthWrapper>
            </Provider>
        </>
    );
}

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, token, isLoading, error } = useSelector((state: RootState) => state.auth);
    const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken && !token) {
            dispatch(setToken(storedToken));
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (token && !user && !autoLoginAttempted) {
            dispatch(autoLogin())
                .unwrap()
                .catch(() => {
                    // Если автологин не удался, удаляем токен из localStorage
                    localStorage.removeItem('token');
                })
                .finally(() => {
                    setAutoLoginAttempted(true);
                });
        }
    }, [dispatch, token, user, autoLoginAttempted]);

    useEffect(() => {
        if (autoLoginAttempted) {
            if (user) {
                if (!['/good-deeds', '/friends'].includes(router.pathname)) {
                    router.push('/good-deeds');
                }
            } else if (!isLoading && !['/login', '/register', '/'].includes(router.pathname)) {
                router.push('/');
            }
        }
    }, [user, isLoading, router, autoLoginAttempted]);

    if (isLoading && !autoLoginAttempted) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default MyApp;
