import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

/**
 * MyChats component displays the list of chats for the logged-in user.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.fetchAgain - Flag to trigger re-fetching of chats
 * 
 * @returns {JSX.Element} The rendered MyChats component
 * 
 * @example
 * <MyChats fetchAgain={true} />
 * 
 * @hook
 * @name useState
 * @description Manages the state of the logged-in user
 * 
 * @hook
 * @name useEffect
 * @description Fetches chats on component mount and when fetchAgain changes
 * 
 * @hook
 * @name useToast
 * @description Displays toast notifications
 * 
 * @function fetchChats
 * @description Fetches chats from the server and updates the state
 * 
 * @async
 * @throws Will display an error toast if the request fails
 * 
 * @returns {Promise<void>}
 * 
 * @example
 * fetchChats();
 */

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  // Destructuring values from ChatState context
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  // Hook for displaying toast notifications
  const toast = useToast();

  // Function to fetch chats from the server
  const fetchChats = async () => {
    // console.log(user._id); // Debugging line, commented out
    try {
      // Configuration for the request, including authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Making a GET request to fetch chats
      const { data } = await axios.get("/api/chat", config);
      // Setting the fetched chats to state
      setChats(data);
    } catch (error) {
      // Displaying an error toast if the request fails
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // useEffect hook to run on component mount and when fetchAgain changes
  useEffect(() => {
    // Setting the logged-in user from local storage
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    // Fetching chats
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    // Main container for the MyChats component
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* Header section with title and button to create a new group chat */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      {/* Container for the list of chats */}
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          // If chats are available, display them in a scrollable stack
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {/* Display the sender's name or chat name */}
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          // If no chats are available, display a loading component
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;
