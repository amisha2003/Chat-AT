import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

/**
 * ChatLoading component
 * 
 * This functional component renders a stack of skeleton loaders to indicate
 * that chat content is loading. It uses Chakra UI's Stack and Skeleton components.
 * 
 * @component
 * @example
 * return (
 *   <ChatLoading />
 * )
 * 
 * @returns {JSX.Element} A stack of skeleton loaders
 * 
 * @see https://chakra-ui.com/docs/components/stack
 * @see https://chakra-ui.com/docs/components/skeleton
 */

// Define a functional component named ChatLoading
const ChatLoading = () => {
  return (
    // Return a Stack component that will contain multiple Skeleton components
    <Stack>
      {/* Each Skeleton component represents a loading placeholder with a height of 45px */}
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
      <Skeleton height="45px" />
    </Stack>
  );
}

// Export the ChatLoading component as the default export
export default ChatLoading;

