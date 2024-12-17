export const parseEmoji = (text) => {
	const emojiMap = {
		':smile:': '😄',
		':heart:': '❤️',
		':thumbsup:': '👍',
		':sunglasses:': '😎',
		// Add more emojis as needed
	};

	return text.replace(/:\w+:/g, (match) => emojiMap[match] || match); 
};