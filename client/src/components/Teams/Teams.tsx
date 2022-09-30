import { TeamList, TeamListItem, TeamWrapper } from "./teams.styles";

const Team = ({ id, initial }: { id: number; initial: string }) => (
    <TeamListItem key={`team-${id}`}>{initial}</TeamListItem>
);

type TeamsConfig = {
    teams: { id: number; initial: string }[];
};

const Teams = ({ teams }: TeamsConfig) => {
    return (
        <TeamWrapper>
            <TeamList>{teams.map(Team)}</TeamList>
        </TeamWrapper>
    );
};

export default Teams;
