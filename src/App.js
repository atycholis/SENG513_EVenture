/*Defines different paths in the URL we want to listen to & which component should be loaded for these different paths */
import { Routes, Route } from "react-router-dom";
//import LoginPage from "./pages/Login";
import AllMeetupsPage from "./pages/AllMeetups";
import NewMeetupsPage from "./pages/NewMeetups";
import FavActivities from "./pages/FavActivities";
import MainNavigation from "./components/layout/MainNavigation";

function App() {
  return (
    <div>
        <MainNavigation />
        <Routes>
            <Route path={'/'} element={<AllMeetupsPage />}/>
            <Route path={'/new-meetup'} element={<NewMeetupsPage />}/>
            <Route path={'/favorites'} element={<FavActivities />}/>
        </Routes>
    </div>
  );
}

/*<Route path={'/new-meetup'}>
        <NewMeetupsPage />
      </Route>
      <Route path={'/favorites'}>
          <FavActivities />
      </Route>*/

export default App;
