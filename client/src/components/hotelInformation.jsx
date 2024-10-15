
function hotelInformation({ hotel }) {
    return (
        <div className="flex-1">

            {/* Hotel Information */}
            <div className="bg-[#0B192C] shadow-lg rounded-lg p-6 text-white mb-6">
                <div>
                    <div className="text-4xl font-bold mb-3">{hotel.hotelName}</div>
                    <div className="flex items-center space-x-2 mb-4">
                        {Array(hotel.hotelStar).fill("⭐").map((star, index) => (
                            <span key={index} className="text-yellow-400 text-3xl">{star}</span>
                        ))}
                    </div>
                    <p className="text-base leading-relaxed mb-4">{hotel.hotelDescription}</p>
                    <div className="flex space-x-2 mt-2">
                        {hotel.hotelTags.map((tag, index) => (
                            <div key={index} className="bg-[#FF6500] text-white py-2 px-3 rounded-lg text-lg font-medium shadow-md">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hotel Image Swiper */}
            <div className="mb-6">
                <div className="grid grid-cols-1 mb-4">
                    {/* Full-width Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={hotel.hotelImages[0]}  // Assuming the first image is the horizontal one
                            alt="Hotel Image 1"
                            className="w-full h-[400px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Remaining Images in Grid */}
                    {hotel.hotelImages.slice(1).map((image, index) => (
                        <div key={index + 1} className="relative overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={image}
                                alt={`Hotel Image ${index + 2}`}  // Adjusted for indexing
                                className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>

        
        </div >
    );
}

export default hotelInformation;
