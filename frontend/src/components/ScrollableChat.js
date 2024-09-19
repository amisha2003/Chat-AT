import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

/**
 * ScrollableChat component that renders a list of chat messages with scrolling capability.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.messages - An array of message objects to be displayed.
 *
 * @example
 * const messages = [
 *   { _id: '1', sender: { _id: 'user1', name: 'John Doe', pic: 'path/to/pic' }, content: 'Hello!' },
 *   { _id: '2', sender: { _id: 'user2', name: 'Jane Doe', pic: 'path/to/pic' }, content: 'Hi there!' }
 * ];
 * <ScrollableChat messages={messages} />
 *
 * @returns {JSX.Element} The rendered ScrollableChat component.
 *
 * @hook
 * @name ChatState
 * @description Extracts the current user from the ChatState context.
 *
 * @see {@link https://chakra-ui.com/docs/components/avatar} for Chakra UI Avatar component documentation.
 * @see {@link https://chakra-ui.com/docs/components/tooltip} for Chakra UI Tooltip component documentation.
 * @see {@link https://www.npmjs.com/package/react-scrollable-feed} for react-scrollable-feed package documentation.
 */

// ScrollableChat component that takes messages as a prop
const ScrollableChat = ({ messages }) => {
  // Extracting the user from the ChatState context
  const { user } = ChatState();

  return (
    // ScrollableFeed component to enable scrolling for the chat messages
    <ScrollableFeed>
      {messages &&
        // Mapping through the messages array to render each message
        messages.map((m, i) => (
          // Each message is wrapped in a div with flex display for alignment
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              // Tooltip component to show the sender's name on hover
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                {/* Avatar component to show the sender's profile picture */}
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            {/* Span to display the message content with conditional styling */}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`, // Different background color based on whether the message is sent by the user
                marginLeft: isSameSenderMargin(messages, m, i, user._id), // Margin left based on sender
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10, // Margin top based on whether the message is from the same user
                borderRadius: "20px", // Rounded corners for the message bubble
                padding: "5px 15px", // Padding inside the message bubble
                maxWidth: "75%", // Maximum width of the message bubble
              }}
            >
              {m.content} {/* Displaying the message content */}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
