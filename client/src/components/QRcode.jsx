import { useEffect, useState } from "react"
import { api } from "../utils/api";
import { useAuth } from "../contexts/useAuth";
import Loader from "./loading/Loader";




const QRcode = () => {


    const { restaurant } = useAuth();
    const [QR, setQR] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [menuUrl, setMenuUrl] = useState('');




    // useEffect(() => {

    //     // add a fetch
    //     // const key = localStorage.getItem('restaurant');
    //     // const value = JSON.parse(key);

    //     if (restaurant.qrCode!=='') {
    //         setLoading(true);
    //         setQR(restaurant.qrCode);
    //         setLoading(false);

    //     } else {
    //         const generateQRCode = async () => {
    //             try {
    //                 setLoading(true);
    //                 setError(null);

    //                 const response = await api.get('/api/qrcode/generate');

    //                 if (response.data.success) {
    //                     setQR(response.data.qrCode);
    //                     setMenuUrl(response.data.menuUrl);

    //                 }
    //             } catch (err) {
    //                 setError('Failed to generate QR code. Please try again.');

    //             } finally {
    //                 setLoading(false);
    //             }
    //         };

    //         generateQRCode();
    //     }


    // }, []);

    // useEffect(
    //     () => {
    //         setLoading(true);

    //         async function fetchres() {
    //             try {

    //                 const res = await api.get(`${import.meta.env.VITE_SERVER_URI}/api/auth/profile`);
    //                 // const restaurantdetails = await res.json();
    //                 if (res.data.restaurant.qrCode) {
    //                     setQR(res.data.restaurant.qrCode);

    //                 } else {
    //                     const generateQRCode = async () => {
    //                         try {

    //                             setError(null);

    //                             const response = await api.get('/api/qrcode/generate');

    //                             if (response.data.success) {
    //                                 setQR(response.data.qrCode);
    //                                 setMenuUrl(response.data.menuUrl);

    //                             }
    //                         } catch (err) {
    //                             setError('Failed to generate QR code. Please try again.');

    //                         } 
    //                     };
    //                     generateQRCode();
    //                 }




    //             } catch (err) {
    //                 setError("Failed to fetch QR code");
    //             } finally {
    //                 setLoading(false);
    //                 // console.log(QR)
    //             }


    //         };
    //         fetchres();
    //     }, []
    // )

    // useEffect(() => {
    //     async function fetchres() {
    //         setLoading(true); // Start loading at the beginning of the async function
    //         try {
    //             const res = await api.get(`${import.meta.env.VITE_SERVER_URI}/api/auth/profile`);
    //             if (res.data.restaurant.qrCode) {

    //                 setQR(res.data.restaurant.qrCode);
    //                 setMenuUrl(`http://localhost:5173/menu/${restaurant.id}`)
    //             } else {
    //                 setError(null);
    //                 try {
    //                     const response = await api.get('/api/qrcode/generate');
    //                     if (response.data.success) {
    //                         setQR(response.data.qrCode);
    //                         setMenuUrl(response.data.menuUrl);
    //                     }
    //                 } catch (err) {
    //                     setError('Failed to generate QR code. Please try again.');
    //                 }
    //             }
    //         } catch (err) {
    //             setError("Failed to fetch QR code");
    //         } finally {
    //             setLoading(false); // Only stop loading after all async work is complete
    //         }
    //     }
    //     fetchres();
    // }, []);

    async function checkImageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    useEffect(() => {
        
        async function fetchres() {

            setLoading(true);
            try {
               
                const res = await api.get(`/api/auth/profile`);
                const qrUrl = res.data.restaurant.qrCode;
                if (qrUrl) {
                    const exists = await checkImageExists(qrUrl);
                    if (exists) {
                        setQR(qrUrl);
                        setMenuUrl(`${import.meta.env.VITE_CLIENT_URI}/menu/${restaurant.id}`);
                    } else {
                        // QR code link is stale, generate a new one
                        await generateNewQRCode();
                    }
                } else {
                    await generateNewQRCode();
                }
            } catch (err) {
                setError("Failed to fetch QR code");
            } finally {
                setLoading(false);
            }
        }

        async function generateNewQRCode() {
            setError(null);
            try {
                const response = await api.get('/api/qrcode/generate');
                if (response.data.success) {
                    setQR(response.data.qrCode);
                    setMenuUrl(response.data.menuUrl);
                    // Optionally, update the database with the new QR code here
                }
            } catch (err) {
                setError('Failed to generate QR code. Please try again.');
            }
        }

        fetchres();
    }, []);



    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = QR;
        link.download = `${restaurant.name.replace(/\s+/g, '-').toLowerCase()}-menu-qrcode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md p-1 flex flex-col">
            <h3 className="text-center text-green-700">Your Menu URL</h3>
            {error && <div className="text-center">{error}</div>}
            {Loading ? <Loader/> : <img src={QR} className="m-1"></img>}
            <div className="flex justify-center">
                <button onClick={downloadQRCode} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-sm rounded-lg h-7 w-18 shadow m-1 p-1 transition">Download</button>
                <button onClick={() => window.open(menuUrl, '_blank')} className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-sm rounded-lg h-7 w-18 shadow m-1 p-1 transition">View</button>
            </div>
        </div>
    )
}

export default QRcode
