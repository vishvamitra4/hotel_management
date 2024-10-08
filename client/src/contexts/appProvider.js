import { UserProvider } from "./user/userContext";

const AppProvider = ({children})=>{
    return(
        <UserProvider>
            {children}
        </UserProvider>
    )
};

export default AppProvider;