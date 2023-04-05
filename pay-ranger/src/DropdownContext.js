import React, {createContext, useState} from "react";
const DropdownContext = createContext(undefined);

function DropdownProvider({children}) {
    const [dropdown, toggleDropdown] = useState(false);
    const dropdownPair = {dropdown: dropdown, toggleDropdown: toggleDropdown};
    return (
        <DropdownContext.Provider value={dropdownPair}>
            {children}
        </DropdownContext.Provider>
    )
}
export {DropdownProvider, DropdownContext};