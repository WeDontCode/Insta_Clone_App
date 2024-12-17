import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchLogo } from '../../assets/constants/constants';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { users, isLoading, getUserProfile, setUsers } = useSearchUser();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchUser = (e) => {
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    getUserProfile(value);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Search"
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems="center"
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: 'none', md: 'block' }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg="black" border="1px solid gray" maxW="400px">
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="Search user" ref={searchRef} value={searchTerm} onChange={handleInputChange} />
              </FormControl>

              <Flex w="full" justifyContent="flex-end">
                <Button type="submit" ml="auto" size="sm" my={4} isLoading={isLoading}>
                  Search
                </Button>
              </Flex>
            </form>

            {/* Conditionally render the SuggestedUser component if users are found */}
            {users && users.map(user => (
              <SuggestedUser key={user.id} user={user} setUser={setUsers} />
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
