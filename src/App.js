import logo from './logo.svg';
import './App.css';
import Addproduct from './components/Addproduct';
import Getproducts from './components/Getproducts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css'  
import 'bootstrap/dist/js/bootstrap.min.js'  
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Makepayment from './components/Makepayment';

function App() {
  return (
   <Router>
    <div className='App'>
      <header className="App-header ">
        <h1 className='text-warning'>Trend Hub</h1>
      </header>

        <section className="row">
            <div className="col-md-12">
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <a href="#" className="navbar-brand">Trend hub</a>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarcollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarcollapse">
                        <div className="navbar-nav">
                            <nav>
                               <Link to= '/signup' className='navlinks ms-2'>Sign Up </Link>
                               <Link to='/Signin' className='navlinks ms-2'> Sign In </Link>
                               <Link to='/addproduct' className='navlinks ms-2'>Add Product </Link>
                               <Link to='/' className='navlinks ms-2'>Get Product </Link>
                            </nav>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
        
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/' element={<Getproducts />} />
      <Route path='/addproduct' element={<Addproduct />} />
      <Route path='/makepayment' element={<Makepayment />} />

    </Routes>
    </div>
   </Router>
  );
}

export default App;
