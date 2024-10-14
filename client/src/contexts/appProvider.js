import { UserProvider } from "./user/userContext";
import BookingDataProvider from "./booking/bookingDataContext";
const AppProvider = ({ children }) => {
    return (
        <UserProvider>
            <BookingDataProvider>
                {children}
            </BookingDataProvider>
        </UserProvider>
    )
};

export default AppProvider;