import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

/**
 * Chatbox component that displays a chat interface.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {boolean} props.fetchAgain - A flag to trigger re-fetching of chat data.
 * @param {Function} props.setFetchAgain - A function to update the fetchAgain flag.
 *
 * @returns {JSX.Element} The rendered Chatbox component.
 *
 * @example
 * <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
 *
 * @hook
 * @name ChatState
 * @description Hook to access the chat state context.
 * @returns {Object} The chat state context.
 * @property {Object} selectedChat - The currently selected chat.
 */

// Define the Chatbox component, which takes fetchAgain and setFetchAgain as props
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  // Destructure selectedChat from the ChatState context
  const { selectedChat } = ChatState();

  return (
    // Return a Box component with various styling properties
    <Box
      // Conditionally display the Box based on the selectedChat state
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      // Center the items inside the Box
      alignItems="center"
      // Set the flex direction to column
      flexDir="column"
      // Add padding of 3 units
      p={3}
      // Set the background color to white
      bg="white"
      // Set the width to 100% on small screens and 68% on medium and larger screens
      w={{ base: "100%", md: "68%" }}
      // Round the corners of the Box
      borderRadius="lg"
      // Set the border width to 1px
      borderWidth="1px"
    >
      {/* Render the SingleChat component, passing down fetchAgain and setFetchAgain as props */}
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}
