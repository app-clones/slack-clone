import styled from "styled-components";

export const paddingLeft = "padding-left: 10px;";

export const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1 / 4;
    background-color: #4e3a4c;
    color: #958993;
`;

export const PushLeft = styled.div`
    ${paddingLeft}
`;

export const TeamNameHeader = styled.h1`
    color: #fff;
    font-size: 20px;
`;

export const SideBarList = styled.ul`
    width: 100%;
    list-style: none;
    padding-left: 0px;
`;

export const SideBarListHeader = styled.li`
    ${paddingLeft}
`;

export const SideBarListItem = styled.li`
    padding: 2px;
    ${paddingLeft}
    &:hover {
        background: #3e313c;
    }
`;

export const Green = styled.span`
    color: #38978d;
`;

// eslint-disable-next-line
export const Bubble = ({ on = true }: { on?: boolean }) =>
    // eslint-disable-next-line
    on ? <Green>●</Green> : <span>○</span>;
