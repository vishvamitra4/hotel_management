import { render } from 'preact'
import App from './app.jsx'
import "./index.css";
import AppProvider from "./contexts/appProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

render(
    <AppProvider>
        <App />
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </AppProvider>
    ,
    document.getElementById('app'))
