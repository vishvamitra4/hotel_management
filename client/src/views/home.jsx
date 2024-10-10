import React from "react";
import Filter from "../components/Filter/filter";
import HotelCard from "../components/hotelCard";
import Navbar from "../components/navbar";
import axios from "axios";

function Home() {

    const [hotels, setHotels] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("/fetch/hotels");
                setHotels(data.data);
            } catch (e) {
                alert(e.response.data.error.message);
            };
        };
        fetchData();
    }, []);

    const allHotels = hotels.map((item, index) => {
        return <HotelCard hotel={item} key={index} />
    })
    return (
        <div>
            <Navbar />
            <Filter />
            <br />
            <div className="grid w-[75%] my-[10px] mx-[auto] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {allHotels}
            </div>
        </div>
    );
};

export default Home;