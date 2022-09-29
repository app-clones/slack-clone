import AppLayout from "../components/AppLayout/AppLayout";
import Channels from "../components/Channels/Channels";
import Header from "../components/Header/Header";
import Messages from "../components/Messages/Messages";
import Teams from "../components/Teams/Teams";
import SendMessage from "../components/SendMessage/SendMessage";

const ViewTeam = () => {
    return (
        <AppLayout>
            <Teams
                teams={[
                    { id: 1, initial: "T" },
                    { id: 2, initial: "B" }
                ]}
            />
            <Channels
                teamName="Team Name"
                username="username"
                channels={[
                    { id: 1, name: "general" },
                    { id: 2, name: "random" }
                ]}
                users={[
                    { id: 1, name: "joe" },
                    { id: 2, name: "bob" }
                ]}
            />
            <Header channelName="announcements" />
            <Messages>
                <ul className="message-list">
                    <li>hi</li>
                    <li>bye</li>
                </ul>
            </Messages>
            <SendMessage channelName="general" />
        </AppLayout>
    );
};

export default ViewTeam;
