import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack, Link } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
	const { isLoading, posts } = useGetFeedPosts();

	return (
		<Container maxW={"container.sm"} py={10} px={2}>
			{/* Loading Skeletons */}
			{isLoading &&
				[0, 1, 2].map((_, idx) => (
					<VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
						<Flex gap="2">
							<SkeletonCircle size="10" />
							<VStack gap={2} alignItems={"flex-start"}>
								<Skeleton height="10px" w={"200px"} />
								<Skeleton height="10px" w={"200px"} />
							</VStack>
						</Flex>
						<Skeleton w={"full"}>
							<Box h={"400px"}>contents wrapped</Box>
						</Skeleton>
					</VStack>
				))}

			{/* Posts Content */}
			{!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}

			{/* No Posts Message */}
			{!isLoading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"teal.400"} textAlign="center">
						"Common stop playing, get yourself some friends, too much work sucks!"
					</Text>
					<Text color={"teal.400"} textAlign="center" mt={2}>
						© 2024 {" "}
						<Link
							href="https://www.linkedin.com/in/gtici"
							target="_blank"
							color="teal.500"
							fontWeight="bold"
							_hover={{ textDecoration: "underline", color: "teal.400" }}
						>
							Adejoh Idoko
						</Link>
					</Text>
				</>
			)}
		</Container>
	);
};

export default FeedPosts;
