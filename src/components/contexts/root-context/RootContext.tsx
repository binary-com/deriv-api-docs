import React from 'react';
import { domains } from '@site/src/data-storage/domains';

const MainContext = React.createContext();

export const useRootContext = () => {
    return React.useContext(MainContext);
}

export const RootContext = ({ children }) => {
    const [is_deriv_location, setIsDerivLocation] = React.useState(true);
    const [is_logged_in, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        // remove branding on hosts that are not Deriv
        const host = window.location.host;
        let is_deriv_host = false;
        domains.forEach(domain => {
            const host_exists = host.indexOf(domain) === 0;
            if (host_exists) {
                is_deriv_host = host_exists;
            }
        });

        if (!is_deriv_host) {
            setIsDerivLocation(false);
        }
    }, []);

    const context_object = {
        is_logged_in,
        is_deriv_location,
        setIsLoggedIn,
    }
    
    return (
        <MainContext.Provider value={context_object}>
            {children}
        </MainContext.Provider>
    )
}