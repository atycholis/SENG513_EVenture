
import ChatsList from "../components/meetups/ChatsList";
import OpenChat from "../components/meetups/OpenChat";
import FriendsList from "../components/meetups/FriendsList";

const DUMMY_CHATS_LIST = [{
    message: "Hello this is a chat",
    sender: "Brandon",
    time: "6:01pm",
    chatID: "1"
},
{
    message: "I want to see Batman!",
    sender: "Jed",
    time: "3:02pm",
    chatID: "2"
},
    ]

    const DUMMY_FRIENDS_LIST = [{
        name: "Brandon"
    },
    {
        name: "Jed"
    },
    ]
/*Page loaded by router*/
function Friends(){
    return (
        <div>
            <h1>My Friends and Groups</h1>
            <ChatsList chats={DUMMY_CHATS_LIST} />
            <OpenChat chat={DUMMY_CHATS_LIST[0]}/>
            <FriendsList friends={DUMMY_FRIENDS_LIST} />

        </div>
    );
}

export default Friends;

/*{[<li>Item1</li>,<li>Item2</li>]}
<ul>
{DUMMY_DATA.map((meetup)=>{
    return <li key={meetup.id}>{meetup.title}</li>
})}
</ul>*/