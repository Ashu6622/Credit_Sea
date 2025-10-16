import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import DetailFile from './components/DetailFile'

function App(){


    return(
      <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/detail-file/:id'} element={<DetailFile />}/>
            </Routes>
            <ToastContainer 
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
      </BrowserRouter>
    )
}

export default App;