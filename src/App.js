/*Defines different paths in the URL we want to listen to & which component should be loaded for these different paths */
import { Routes, Route } from "react-router-dom";
//import LoginPage from "./pages/Login";
import AllActivitiesPage from "./pages/AllActivities";
import NewMeetupsPage from "./pages/NewMeetups";
import FavActivities from "./pages/FavActivities";
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
        <Routes>
            <Route path={'/'} element={<AllActivitiesPage />}/>
            <Route path={'/new-meetup'} element={<NewMeetupsPage />}/>
            <Route path={'/favorites'} element={<FavActivities />}/>
        </Routes>
    </Layout>
  );
}

export default App;
