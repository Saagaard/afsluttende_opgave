import 
{Route, Routes} from 'react-router-dom';
import './reset.scss'
import './App.scss';
import Home from './components/pages/Home';
import Navbar from './components/Layout/Navbar';
import Opgave2 from './components/pages/Opgave2';


function App() {
  return (
    <div className="App">

    <Navbar />

    {/* ROUTES */}
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/opgave2" element={<Opgave2/>}/>


    </Routes>




    </div>
  );
}

export default App;
