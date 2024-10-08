import { render } from 'preact'
import App from './app.jsx'
import "./index.css";
import AppProvider from "./contexts/appProvider";

render(
    <AppProvider>
        <App />
    </AppProvider>
    ,
    document.getElementById('app'))
