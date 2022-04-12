/*Defines different paths in the URL we want to listen to & which component should be loaded for these different paths */
import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/Login";
import AllActivitiesPage from "./pages/AllActivities";
import FavActivities from "./pages/FavActivities";
import Friends from "./pages/Friends";
import Layout from './components/layout/Layout'
import React, { useEffect, useState } from 'react'
import axios from "axios";
//const [username, setUsername] = useState("");
function App() {
  return (
    <Layout>
        <Routes>
            <Route path={'/'} element={<LoginPage />}/>
            <Route path={'/discover'} element={<AllActivitiesPage />}/>
            <Route path={'/favorites'} element={<FavActivities />}/>
            <Route path={'/friends'} element={<Friends />}/>
        </Routes>
    </Layout>
  );
}

export default App;
