import React, {createContext, useState} from "react";
const LoginContext = createContext(undefined);

function LoginProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginPair = {isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn};
    return (
        <LoginContext.Provider value={loginPair}>
            {children}
        </LoginContext.Provider>
    )
}
export {LoginProvider, LoginContext};