import React, { createContext } from 'react';


export const BookingDataContext = createContext();

export const BookingDataProvider = ({ children }) => {

    const [bookingData , setBookingData] = React.useState(null);
    const [grandTotal , setGrandTotal] = React.useState(0);


    return(
        <BookingDataContext.Provider value={{bookingData , setBookingData , grandTotal , setGrandTotal}}>
            {children}
        </BookingDataContext.Provider>
    )
};

export default BookingDataProvider;