import React from 'react';

type MainContextTypes = {
    is_logged_in?: boolean;
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainContext = React.createContext<MainContextTypes>({});

export const useRootContext = () => {
    return React.useContext(MainContext);
}

export const RootContext = ({ children }) => {
    const [is_logged_in, setIsLoggedIn] = React.useState(false);

    const context_object = {
        is_logged_in,
        setIsLoggedIn,
    }
    
    return (
        <MainContext.Provider value={context_object}>
            {children}
        </MainContext.Provider>
    )
}
