/* SearchContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context
const SearchContext = createContext();

// Custom hook to use the SearchContext
export const useSearchContext = () => {
    return useContext(SearchContext);
};

// SearchProvider component to wrap your app with this context
export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState(""); // Define search query state

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;*/
