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
    return (
        <div>
            <h1>My Favourite Activities</h1>
            <FavActivityList activities={DUMMY_DATA} />
        </div>
    );
}

export default FavActivitiesPage;

/*{[<li>Item1</li>,<li>Item2</li>]}
<ul>
{DUMMY_DATA.map((meetup)=>{
    return <li key={meetup.id}>{meetup.title}</li>
})}
</ul>*/