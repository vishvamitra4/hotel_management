import React from "react";
import Filter from "../components/Filter/filter";
import HotelCard from "../components/hotelCard";
import Navbar from "../components/navbar";
import axios from "axios";
import Footer from "../components/footer";
import LandingPage from "../components/landingPage";

function Home() {
  const [hotels, setHotels] = React.useState([]);


  const fetchHotels = async (filters = {}) => {
    try {
      const { search, sortBy, value } = filters;
      const query = {};
      if (search) query.search = search;
      if (sortBy && value) query[sortBy] = value;
      const queryString = new URLSearchParams(query).toString();
      

      const { data } = await axios.get(`/fetch/hotels?${queryString}`);
      setHotels(data.data);
    } catch (e) {
      alert(e.response.data.error.message);
    }
  };

  React.useEffect(() => {
    fetchHotels(); 
  }, []);

  const allHotels = hotels.map((item, index) => {
    return <HotelCard hotel={item} key={index} />;
  });

  return (
    <div>
      <LandingPage />
      <Filter onFilter={fetchHotels} />
      <br />
      <div className="grid w-[75%] my-[10px] mx-[auto] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allHotels}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
