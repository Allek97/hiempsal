/* eslint-disable no-unused-vars */
import { useRouter } from "next/router";
import {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
    useCallback,
    FC,
} from "react";

interface HValidation {
    history: string[];
    setHistory(data: string[]): void;
    back(): void;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

const HistoryProvider: FC = ({ children }) => {
    const { asPath, push, pathname } = useRouter();
    const [history, setHistory] = useState<string[]>([]);

    const back = useCallback(() => {
        for (let i = history.length - 2; i >= 0; i -= 1) {
            const route = history[i];
            if (!route.includes("#") && route !== pathname) {
                push(route);

                // if you want to pop history on back
                const newHistory = history.slice(0, i);
                setHistory(newHistory);

                break;
            }
        }
    }, [history, pathname, push]);

    useEffect(() => {
        setHistory((previous) => [...previous, asPath]);
    }, [asPath]);

    const value = useMemo(() => {
        return {
            back,
            history,
            setHistory,
        };
    }, [history, back]);

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};

export function useHistory(): HValidation {
    const context = useContext(HistoryContext);
    return context;
}

export default HistoryProvider;
