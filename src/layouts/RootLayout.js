import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RootLayout() {
    // const location = useLocation();
    const { pathname } = useLocation();
    const showNavbar = !['/login', '/register'].includes(pathname);
    return (
        
        <div className="root-layout">
            {/* <header> */}
                {showNavbar && <Navbar />}
            {/* </header> */}
            {/* <main> */}
                <Outlet />
            {/* </main> */}
        </div>
       
        
    )
}