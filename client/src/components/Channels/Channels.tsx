import { NameId } from "../../globalTypes";

import {
    Bubble,
    ChannelWrapper,
    PushLeft,
    SideBarList,
    SideBarListHeader,
    SideBarListItem,
    TeamNameHeader
} from "./channels.styles";

const channel = ({ id, name }: { id: number; name: string }) => (
    <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
);

const user = ({ id, name }: NameId) => (
    <SideBarListItem key={`user-${id}`}>
        <Bubble /> {name}
    </SideBarListItem>
);

type ChannelsConfig = {
    teamName: string;
    username: string;
    channels: NameId[];
    users: NameId[];
};

const Channels = ({ teamName, username, channels, users }: ChannelsConfig) => {
    return (
        <ChannelWrapper>
            <PushLeft>
                <TeamNameHeader>{teamName}</TeamNameHeader>
                {username}
            </PushLeft>
            <div>
                <SideBarList>
                    <SideBarListHeader>Channels</SideBarListHeader>
                    {channels.map(channel)}
                </SideBarList>
            </div>
            <div>
                <SideBarList>
                    <SideBarListHeader>Direct Messages</SideBarListHeader>
                    {users.map(user)}
                </SideBarList>
            </div>
        </ChannelWrapper>
    );
};

export default Channels;
