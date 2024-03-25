
import './App.css'
import Categories from './composants/CategorieBar/Categories';
import Ocarina from './composants/Ocarina/Ocarina';
import Partition from './composants/Partition/Partition';
import Hyrulemap from './composants/HyruleMap/Hyrulemap';
import AppRouter from './composants/AppRouter.jsx';


function App() {


  return (
    <>
    <Categories />
    <Ocarina />
    <Partition />
    <Hyrulemap />
    <AppRouter />
    </>
  )
}

export default App;

