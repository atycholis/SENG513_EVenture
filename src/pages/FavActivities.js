/*Fav activities*/
import FavActivityList from "../components/activities/FavActivityList";

const DUMMY_DATA = [{
    id: 'm1',
    title: 'The Batman',
    image:
        'https://images-na.ssl-images-amazon.com/images/I/81DGyn3r62L.jpg',
    address: '3953 University Ave NW #250, Calgary, AB T3B 6K3',
    description:
        "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
},
    ]

/*Page loaded by router*/
function FavActivitiesPage(){
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return (
        <div>
            <h1>{user.username}'s Favourite Games</h1>
            <FavActivityList activities={user.likedActivites} />
        </div>
    );
}

export default FavActivitiesPage;
