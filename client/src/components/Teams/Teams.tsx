import { TeamWrapper } from "./teams.styles";

const team = ({ id, initial }: { id: number; initial: string }) => (
    <li key={`team-${id}`}>{initial}</li>
);

type TeamsConfig = {
    teams: { id: number; initial: string }[];
};

const Teams = ({ teams }: TeamsConfig) => {
    return (
        <TeamWrapper>
            <ul>{teams.map(team)}</ul>
        </TeamWrapper>
    );
};

export default Teams;
