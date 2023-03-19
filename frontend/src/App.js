import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homapage from './pages/Homapage';
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './componets/Layout';
import Createpost from './componets/Createpost';
import Singlepost from './componets/Singlepost';
import Updatepost from './componets/Updatepost';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Homapage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/registation' element={<Register/>}/>
            <Route path='/createpost' element={<Createpost/>}/>
            <Route path='/post/:id' element={<Singlepost/>}/>
            <Route path='/update/:id' element={<Updatepost/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
