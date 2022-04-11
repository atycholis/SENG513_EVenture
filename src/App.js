/*Defines different paths in the URL we want to listen to & which component should be loaded for these different paths */
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import AllActivitiesPage from "./pages/AllActivities";
import FavActivities from "./pages/FavActivities";
import Layout from './components/layout/Layout'
import React, { useEffect, useState } from 'react'

function App() {

  return (
    <Layout>
        <Routes>
            <Route path={'/'} element={<LoginPage />}/>
            <Route path={'/discover'} element={<AllActivitiesPage />}/>
            <Route path={'/favorites'} element={<FavActivities />}/>
        </Routes>
    </Layout>
  );
}

export default App;
