import React, { useEffect, useState } from "react";
import myimage from "../assets/testimage.jpg";
import QRcode from "./QRcode";
import LogoUpload from "./LogoUpload";
import EditProfile from "./EditProfile";




const Profile = ({ restaurant }) => {

    const [shouldRefetch, setShouldRefetch] = useState(false);

    const restaurantId = restaurant.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [restaurantdetails, setRestaurant] = useState({});

    useEffect(() => {
        async function fetchMenu() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_URI}/api/menu/public/${restaurantId}`
                );
                const data = await res.json();
                const rest = data.restaurant.name;
                const logo = data.restaurant.logo;
                const address = data.restaurant.address;
                const phone = data.restaurant.phone;
                setRestaurant({ name: rest, logo: logo, address: address, phone: phone });

            } catch (err) {
                setError("Failed to fetch menu.");
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, [shouldRefetch]);

    const [showUpload, setShowUpload] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div className={`mt-5`}>
                        {showUpload && (
                            <LogoUpload
                                setShowUpload={setShowUpload}
                                setShouldRefetch={setShouldRefetch}
                            />
                        )}

                        {
                            showEdit && <EditProfile 
                            setShowEdit={setShowEdit} 
                            setShouldRefetch={setShouldRefetch}
                            restaurantdetails={restaurantdetails}/>
                        }
            <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl border border-green-100">

                {/* Header: Logo and Name Left, Address/Phone Right */}
                <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    {/* Left: Logo and Name */}
                    <div className="relative" onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <img
                            src={restaurantdetails.logo || myimage}
                            alt="Restaurant Logo"
                            className="w-16 h-16 object-cover rounded-full border-2 border-green-400 shadow-md"
                        />
                        {isHovered && (
                            <button
                                onClick={() => setShowUpload(true)}
                                className="absolute inset-0 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition"

                                title="Edit Logo"
                            >
                                <span className="material-icons text-xl">edit_square</span>
                            </button>
                        )}
                    </div>
                    <h1 className="text-2xl font-bold text-green-700 tracking-wide truncate">
                        {restaurantdetails.name}
                    </h1>
                    {/* Right: Address and Phone */}
                 
                    <div className="flex flex-col items-end text-right min-w-0">
                           <button
                                onClick={() => setShowEdit(true)}
                                className="flex items-end justify-end text-gray-400 transition hover:text-gray-500"

                                title="Edit Profile"
                            >
                                <span className="material-icons text-sm ">edit_square</span>
                            </button>
                        {restaurantdetails.address && (
                            <div className="text-gray-500 text-sm flex items-center gap-1">
                                <span className="material-icons text-green-400 text-base align-middle">location_on</span>
                                <span className="truncate max-w-[180px]">{restaurantdetails.address}</span>
                            </div>
                        )}
                        {restaurantdetails.phone && (
                            <div className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                <span className="material-icons text-green-400 text-base align-middle">phone</span>
                                <span className="truncate max-w-[180px]">{restaurantdetails.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                <hr className="my-4 border-green-100" />

                {loading && (
                    <div className="text-center text-gray-500 py-8 text-lg font-medium">
                        Loading...
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 py-8 text-lg font-semibold">
                        {error}
                    </div>
                )}

                <QRcode />

            </div>
        </div>
    )
}

export default Profile
