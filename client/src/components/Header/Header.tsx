import { Header as HeaderSemantic } from "semantic-ui-react";

import { HeaderWrapper } from "./header.styles";

type HeaderConfig = {
    channelName: string;
};

const Header = ({ channelName }: HeaderConfig) => {
    return (
        <HeaderWrapper>
            <HeaderSemantic textAlign="center">#{channelName}</HeaderSemantic>
        </HeaderWrapper>
    );
};

export default Header;
