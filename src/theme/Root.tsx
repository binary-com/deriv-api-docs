import React from 'react';
import { RootContext } from '../components/contexts/root-context/RootContext';

export default function Root({ children }) {
    return (
        <>
            <RootContext>
                {children}
            </RootContext>
        </>
    )
}
