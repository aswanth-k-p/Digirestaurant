
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../contexts/useAuth';


const Register = () => {

    const upload_preset = "Digirestaurant";
    const cloud_name = "dory5zzia";

    const [Image, setImage] = useState({});
    const [Loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        logo: ''
    });
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // const handleChangeLogo = async (Image) => {

    //     console.log(Image)


    // const file=Image;
    // if(!file) return
    // setLoading(true);



    // const data=new FormData();
    // data.append("file", file);
    // data.append("upload_preset", upload_preset);
    // data.append("cloud_name", cloud_name);

    // console.log(data)

    //     const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
    //         method: "POST",
    //         body: data
    //     })


    // const uploadedURL= await res.json();
    // console.log(uploadedURL.url);

    //     // setFormData({
    //     //     ...formData,
    //     //     [logo]: uploadedURL.url
    //     // });

    //     setFormData(prev => ({
    //         ...prev,
    //         logo: uploadedURL.url
    //     }));


    //     setLoading(false);
    //     console.log(formData);
    // };


    const handleChangeLogo = async (file) => {
        if (!file) return;
        setLoading(true);

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", upload_preset);
        // Do NOT append cloud_name to FormData; it's only needed in the URL

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                body: data
            });
            const uploadedURL = await res.json();

            setFormData(prev => ({
                ...prev,
                logo: uploadedURL.url
            }));
        } catch (error) {
            // Optionally handle upload error here
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            // Error is handled in the context
        }
    };
    return (
        <div className="antialiased bg-gradient-to-br from-green-200 to-white min-h-screen">
            
            <div className="container px-6 mx-auto">
                <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
                    <div className="flex flex-col w-full">
                        <div>
                            <svg
                                className="w-20 h-20 mx-auto md:float-left fill-stroke text-gray-800"
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
                        </div>
                        <h1 className="text-5xl text-gray-800 font-bold">Digimenu</h1>
                        <p className="w-5/12 mx-auto md:mx-0 text-gray-500 mt-3">
                            Digitalise your old school paper menu!
                        </p>
                    </div>
                    <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
                        <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                                Sign up
                            </h2>
                            {error && <div className="text-center">{error}</div>}
                            <form className="w-full" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="flex flex-col space-y-5">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="text-gray-500 mb-2 block">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                onChange={handleChange}
                                                value={formData.name}
                                                placeholder="Enter your name"
                                                className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            />
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="text-gray-500 mb-2 block">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                onChange={handleChange}
                                                value={formData.email}
                                                placeholder="Enter your email"
                                                className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            />
                                        </div>
                                        {/* Address */}
                                        <div>
                                            <label htmlFor="address" className="text-gray-500 mb-2 block">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                onChange={handleChange}
                                                value={formData.address}
                                                placeholder="Enter your address"
                                                className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            />
                                        </div>
                                    </div>
                                    {/* Right Column */}
                                    <div className="flex flex-col space-y-5">
                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="text-gray-500 mb-2 block">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                onChange={handleChange}
                                                value={formData.phone}
                                                placeholder="Enter your phone"
                                                className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            />
                                        </div>
                                        {/* Password */}
                                        <div>
                                            <label htmlFor="password" className="text-gray-500 mb-2 block">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={handleChange}
                                                value={formData.password}
                                                placeholder="Enter your password"
                                                className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 w-full placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                                            />
                                        </div>
                                        {/* Image Upload */}
                                        <div>
                                            <label htmlFor="image" className="text-gray-500 mb-2 block">
                                                {Loading ? "Uploading the logo" : "Upload Logo"}
                                            </label>
                                            <input
                                                type="file"
                                                id="logo"
                                                name="logo"
                                                // value={formData.logo}
                                                onChange={(e) => handleChangeLogo(e.target.files[0])}
                                                accept="image/*"
                                                className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full mt-8">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-green-600 rounded-lg text-green-100 hover:bg-green-700"
                                    >
                                        <div className="flex flex-row items-center justify-center">
                                            <div className="mr-2">
                                                <svg
                                                    className="w-6 h-6"
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
                                            </div>
                                            {loading ? <div className="font-bold">Registering...</div> : <div className="font-bold">Sign up</div>}
                                        </div>
                                    </button>
                                    <div className="flex justify-evenly mt-5">
                                        <Link to="/login"

                                            className="w-full text-center font-medium text-gray-500"
                                        >
                                            Already have an account? Login!
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
