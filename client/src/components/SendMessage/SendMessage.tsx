import { Input } from "semantic-ui-react";
import { SendMessageWrapper } from "./sendMessage.styles";

type SendMessageConfig = {
    channelName: string;
};

const SendMessage = ({ channelName }: SendMessageConfig) => {
    return (
        <SendMessageWrapper>
            <Input fluid placeholder={`Message # ${channelName}`} />
        </SendMessageWrapper>
    );
};

export default SendMessage;
