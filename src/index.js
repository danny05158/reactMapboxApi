import { createRoot } from 'react-dom/client'
import App from './components/App';
import './components/CSS/index.css';

const root = createRoot(document.getElementById('root'))
root.render(<App/>)
