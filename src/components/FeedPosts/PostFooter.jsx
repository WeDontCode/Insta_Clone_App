import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import Picker from '@emoji-mart/react'

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isEmojiPickerOpen, onOpen: onOpenEmojiPicker, onClose: onCloseEmojiPicker } = useDisclosure();
	const toast = useToast();

	const addEmoji = (emoji) => {
		setComment((prevComment) => prevComment + emoji.native);
		commentRef.current.focus();
	};

	const handleSubmitComment = async () => {
		if (!comment.trim()) {
			toast({
				title: "Comment cannot be empty.",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
			return;
		}
		await handlePostComment(post.id, comment);
		setComment("");
		toast({
			title: "Comment posted!",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	return (
		<Box mb={10} mt={4}>
			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2}>
				<Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
					{!isLiked ? <NotificationsLogo aria-label="Like Post" /> : <UnlikeLogo aria-label="Unlike Post" />}
				</Box>

				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
					<CommentLogo aria-label="Comment on Post" />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"}>{likes} likes</Text>

			{isProfilePage ? (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			) : (
				<>
					<Text fontSize='sm' fontWeight={700}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>{post.caption}</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
					{isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
				</>
			)}

			{authUser && (
				<Flex direction="column" w={"full"} gap={2}>
					<Flex alignItems="center" gap={2} justifyContent={"space-between"} w={"full"}>
						<InputGroup>
							<Input
								variant={"flushed"}
								placeholder={"Add a comment..."}
								fontSize={14}
								onChange={(e) => setComment(e.target.value)}
								value={comment}
								ref={commentRef}
							/>
							<InputRightElement>
								<Button
									fontSize={14}
									color={"blue.500"}
									fontWeight={600}
									cursor={"pointer"}
									_hover={{ color: "white" }}
									bg={"transparent"}
									onClick={handleSubmitComment}
									isLoading={isCommenting}
									disabled={!comment.trim()} // Disable if comment is empty
								>
									Post
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>

					<Button onClick={onOpenEmojiPicker} variant="ghost" colorScheme="blue" size="sm">
						Add Emoji
					</Button>

					<Modal isOpen={isEmojiPickerOpen} onClose={onCloseEmojiPicker} size="lg">
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>Select an Emoji</ModalHeader>
							<ModalCloseButton />
							<ModalBody display="flex" alignItems="center" justifyContent="center">
								<Picker onEmojiSelect={addEmoji} />
							</ModalBody>
						</ModalContent>
					</Modal>
				</Flex>
			)}
		</Box>
	);
};

export default PostFooter;