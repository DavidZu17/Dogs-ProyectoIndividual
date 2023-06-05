import './App.css';
import Home from './components/Home/Home';
import Welcome from './components/Welcome/Welcome';
import DetailDog from './components/Detail/DetailDog';
import Form from './components/Form/Form';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { cargarAllDogsBD } from './redux/actions';



// encargada de desplegar todos los componentes y rutas coorespondientes 
function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    navigate('/');
//carga los dogs y temperamentos de la bd
// al iniciar la app
    if (props.dogs.length === 0) {
      dispatch(cargarAllDogsBD());
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<Home alldogs={props.dogs} allTemperaments={props.temperaments} />} />
        <Route path='/' element={<Welcome />} />
        <Route path='/detail/:id' element={<DetailDog/>} />
        <Route path='/FormAgregar' element={<Form allTemperaments={props.temperaments} />}/>
      </Routes>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    dogs: state.dogs,
    temperaments: state.temperaments
  }
}

export default connect(mapStateToProps, null)(App);
