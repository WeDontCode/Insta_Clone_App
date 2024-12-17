import { Box, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
	const { isLoading, suggestedUsers } = useGetSuggestedUsers();

	
	if (isLoading) return null;

	return (
		<VStack py={8} px={6} gap={4}>
			<SuggestedHeader />

			{suggestedUsers.length !== 0 && (
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
					<Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
						Suggested for you
					</Text>
					<Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
						See All
					</Text>
				</Flex>
			)}

			{suggestedUsers.map((user) => (
				<SuggestedUser user={user} key={user.id} />
			))}

			{/* Footer Section */}
			<Box fontSize={12} color="gray.700" mt={5} alignSelf="center">
				<Text fontSize={14} color="gray.600">
					©{" "}
					<Link
						href="https://www.linkedin.com/in/gtici"
						target="_blank"
						color="teal.500"
						fontWeight="bold"
						_hover={{ textDecoration: "underline", color: "teal.400" }}
					>
						Adejoh Idoko
					</Link>{" "}
					2024
				</Text>
			</Box>
		</VStack>
	);
};

export default SuggestedUsers;
