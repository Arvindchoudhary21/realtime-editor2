import './App.css';
// !we need to import this to go to the pages of editor and home to switch pages 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88'
              }
            }
          }}
        >
        </Toaster>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* room id is dynamic here ok */}
          <Route path='/editor/:roomId' element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
