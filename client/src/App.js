
import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css"
import {Home} from "./pages/home";
import {Auth} from "./pages/auth";
import {CreateRecipe} from "./pages/create-recipe";
import {SavedRecipes} from "./pages/saved-recipes";
import {Navbar} from "./components/navbar";
import {Header} from "./components/header";

function App() {
  return (
    <div className="App">
     <Header />
<Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/auth" element={<Auth/>} />
    <Route path="/create" element={<CreateRecipe/>} />
    <Route path="/saved-recipes" element={<SavedRecipes/>} />

  </Routes>
</Router>
    </div>
  );
}

export default App;
