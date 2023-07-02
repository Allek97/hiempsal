/* eslint-disable no-unused-vars */
import { useRouter } from "next/router";
import {
    createContext,
    useState,
    useEffect,
    useContext,
    useMemo,
    FC,
    useCallback,
} from "react";

interface HValidation {
    history: string[];
    setHistory(data: string[]): void;
    back(fallbackRoute?: string): void;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

const HistoryProvider: FC = ({ children }) => {
    const { asPath, push } = useRouter();
    const [history, setHistory] = useState<string[]>([]);

    const back: HValidation["back"] = useCallback(
        (fallbackRoute?: string) => {
            for (let i = history.length - 2; i >= 0; i -= 1) {
                const route = history[i];

                if (!route.includes("#") && route !== asPath) {
                    push(route);
                    const newHistory = history.slice(0, i);
                    setHistory(newHistory);
                    return;
                }
            }
            if (fallbackRoute) {
                push(fallbackRoute);
            }
        },
        [history, asPath, push]
    );

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
