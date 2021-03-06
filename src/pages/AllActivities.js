/*All activities*/
import ActivityList from "../components/activities/ActivityList";
import { io } from "socket.io-client";
import React, { useEffect, useState } from 'react'

//let socket = io('https://localhost:3001');

/*socket.on('get-new-activity-response', (activityList) =>{
    //TO DO store activity list in a const similar to dummy data to be displayed on discover page
});*/

//TO BE REPLACED BY DATA FROM BE
let DUMMY_DATA = [{
    id: 'm1',
    title: 'The Batman',
    image:
        'https://images-na.ssl-images-amazon.com/images/I/81DGyn3r62L.jpg',
    description:
        "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
},
    {
        id: 'm2',
        title: 'The Lost City',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy99-JIoQD_tDXwVlktYQVhmWUZPAVX92Tq4FIssNpJ9WDQYrP',
        description:
            "Reclusive author Loretta Sage writes about exotic places in her popular adventure novels that feature a handsome cover model named Alan. While on tour promoting her new book with Alan, Loretta gets kidnapped by an eccentric billionaire who hopes she can lead him to an ancient city\'s lost treasure from her latest story. Determined to prove he can be a hero in real life and not just on the pages of her books, Alan sets off to rescue her.",
    },]

/*Page loaded by router*/
function AllActivitiesPage(){
    const [activity, setActivity] = useState(true);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    useEffect(() => {
        if (true) {
            fetch("/newActivity/" + user.username).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data);
                    DUMMY_DATA.push(data);
                    setActivity(false);
                }
            )
        }
    }, [])

    return (
        <div>
            <h1>Rate Games For {user.username}</h1>
            <ActivityList activities={DUMMY_DATA} />
        </div>
    );
}

export default AllActivitiesPage;