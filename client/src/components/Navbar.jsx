import { useAuth } from '../contexts/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setActiveComponent }) => {

    const { restaurant, logout } = useAuth();

    const navigate = useNavigate();
    const onLogout=()=>{
        logout();
        navigate('/login');

    }
    return (
        <nav className="w-full bg-green-100 shadow-md px-6 py-3 flex items-center justify-between">
            {/* Left: Brand */}
           
            <div className="text-2xl font-bold text-green-700 tracking-wide">
                 <svg
                className="w-7 h-7 mx-auto md:float-left fill-stroke text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
                Digimenu
            </div>
            

            {/* Right: Welcome, Profile, Logout */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                    Welcome <span className="text-green-700">{restaurant?.name} !</span>
                </span>
                <button
                    onClick={() => setActiveComponent("menu")}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition"
                >
                    Menu
                </button>
                <button
                    onClick={() => setActiveComponent("profile")}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition"
                >
                    Profile
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center px-4 py-2 bg-green-600 text-green-100 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    <span className="mr-2">Logout</span>
                    {/* SVG Icon */}
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                    </svg>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
