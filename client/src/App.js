import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Subscribed from './pages/Subscribed';
import Favorite from './pages/Favorite';
import Overview from './pages/Overview';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import UserProfile from './pages/UserProfile';
import EditRecipe from './pages/EditRecipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout of website */}
        <Route path='/' element = {<Layout />}>
          <Route path='/' element={<Overview />} />
          <Route path='/recipe' element={<Recipes />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/subscribed' element={<Subscribed />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/recipe-details/:id/:name' element={<RecipeDetails />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/edit-recipe/:id' element={<EditRecipe />} />
        </Route>

        {/* Register page */}
        <Route path='/register' element = {<Register />} />

        {/* Login page */}
        <Route path='/login' element = {<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
