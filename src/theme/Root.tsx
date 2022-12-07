import React from 'react';
import { RootContext } from '../components/contexts/root-context/RootContext';
import './themes.css'

export default function Root({ children }) {
    return (
        <>
            <RootContext>
                {children}
            </RootContext>
        </>
    )
}
