import { NameId } from "../../globalTypes";

import { ChannelWrapper } from "./channels.styles";

const channel = ({ id, name }: { id: number; name: string }) => (
    <li key={`channel-${id}`}># {name}</li>
);

const user = ({ id, name }: NameId) => <li key={`user-${id}`}># {name}</li>;

type ChannelsConfig = {
    teamName: string;
    username: string;
    channels: NameId[];
    users: NameId[];
};

const Channels = ({ teamName, username, channels, users }: ChannelsConfig) => {
    return (
        <ChannelWrapper>
            <div>
                {teamName}
                {username}
            </div>
            <div>
                <ul>
                    <li>Channels</li>
                    {channels.map(channel)}
                </ul>
            </div>
            <div>
                <ul>
                    <li>Direct Messages</li>
                    {users.map(user)}
                </ul>
            </div>
        </ChannelWrapper>
    );
};

export default Channels;
