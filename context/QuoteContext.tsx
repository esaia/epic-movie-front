import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AuthProviderProps, quoteContextProps } from "./types";

export const QuoteContext = createContext<quoteContextProps>({
  searchQuery: "",
  setSearchQuery: () => {},
});

export const QuoteProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <QuoteContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => useContext(QuoteContext);
