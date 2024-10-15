import { Link } from "react-router-dom";
function LandingPage() {

    return(
        <nav className={`flex justify-center items-center p-4 h-[400px] bg-cover bg-center`}
        style={{ backgroundImage: 'url("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800")' }}>
        <div className="w-full max-w-7xl flex justify-between items-center">
            <div className="text-white text-4xl font-extrabold">
                <Link to={"/"}><h1 className='text-[200px]'><span className='text-[300px]'>AIR</span><span className='text-[#ff385c]'>BNB</span></h1></Link>
            </div>
        </div>
    </nav>
    )
};


export default LandingPage;