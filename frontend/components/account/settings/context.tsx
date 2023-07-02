import {
    createContext,
    Dispatch,
    FC,
    SetStateAction,
    useContext,
    useMemo,
    useState,
} from "react";

interface StateValues {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address1: string;
    city: string;
    company: string;
    country: string;
    zip: string;
    currentPassword: string;
    newPassword: string;
    phoneError: string;
}

interface StateModifiers {
    setEmail: Dispatch<SetStateAction<string>>;
    setFirstName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setPhone: Dispatch<SetStateAction<string>>;
    setAddress1: Dispatch<SetStateAction<string>>;
    setCity: Dispatch<SetStateAction<string>>;
    setCompany: Dispatch<SetStateAction<string>>;
    setCountry: Dispatch<SetStateAction<string>>;
    setZip: Dispatch<SetStateAction<string>>;
    setCurrentPassword: Dispatch<SetStateAction<string>>;
    setNewPassword: Dispatch<SetStateAction<string>>;
    setPhoneError: Dispatch<SetStateAction<string>>;
}

const initialState: StateValues = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address1: "",
    city: "",
    company: "",
    country: "",
    zip: "",
    currentPassword: "",
    newPassword: "",
    phoneError: "",
};

const stateModifiers: StateModifiers = {
    setEmail: () => {},
    setFirstName: () => {},
    setLastName: () => {},
    setPhone: () => {},
    setAddress1: () => {},
    setCity: () => {},
    setCompany: () => {},
    setCountry: () => {},
    setZip: () => {},
    setCurrentPassword: () => {},
    setNewPassword: () => {},
    setPhoneError: () => {},
};

type State = StateValues & StateModifiers;

const SettingsContext = createContext<State>({
    ...initialState,
    ...stateModifiers,
});

export const SettingsProvider: FC = ({ children }) => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [address1, setAddress1] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [zip, setZip] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const hooks: StateValues = useMemo(() => {
        return {
            email,
            firstName,
            lastName,
            phone,
            address1,
            city,
            company,
            country,
            zip,
            currentPassword,
            newPassword,
            phoneError,
        };
    }, [
        address1,
        city,
        company,
        country,
        email,
        firstName,
        lastName,
        currentPassword,
        newPassword,
        phone,
        zip,
        phoneError,
    ]);

    const setters: StateModifiers = useMemo(() => {
        return {
            setEmail,
            setFirstName,
            setLastName,
            setPhone,
            setAddress1,
            setCity,
            setCompany,
            setCountry,
            setZip,
            setCurrentPassword,
            setNewPassword,
            setPhoneError,
        };
    }, [
        setEmail,
        setFirstName,
        setLastName,
        setPhone,
        setAddress1,
        setCity,
        setCompany,
        setCountry,
        setZip,
        setCurrentPassword,
        setNewPassword,
        setPhoneError,
    ]);

    const value: State = useMemo(
        () => ({
            ...hooks,
            ...setters,
        }),
        [hooks, setters]
    );
    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useCustomerSettings = () => {
    return useContext(SettingsContext);
};
