import React from "react";
import { Flex, Button, Icon, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"; // Import useDisclosure and Modal
import { FaHome, FaHistory, FaList, FaCheckCircle, FaPlus, FaSignOutAlt } from "react-icons/fa"; // Import icons including FaSignOutAlt for logout
import Logo from "../../../assets/images/main/Logo.png";
import { useLogout } from '../../../hooks/useLogout';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const AdminNav = ({ onNavChange }) => {
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();
  const { logout } = useLogout();
  const navigate = useNavigate(); // Use navigate hook

  const handleLogoutWithConfirmation = () => {
    onLogoutOpen();  
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    onLogoutClose(); // Close modal after logout
  };

  return (
    <Flex
      direction="column"
      bg="#FFF9EC"
      color="white"
      w="10%"
      position="fixed"
      height="100vh"
      p={4}
      alignItems="center" // Center the items in the Flex container
    >
      {/* Add the image */}
      <Image
        src={Logo} // Replace with the correct image URL
        mb={10} // Add margin at the bottom to separate image from buttons
      />
      
      {/* Button components */}
      <Button
        variant="ghost"
        color="black"
        onClick={() => onNavChange("home")}
        mb={4}
        bg="orange.200"
        _hover={{ bg: "orange.300" }}
        ml={5}
        mr={5}
        w="60px"
        h="60px"
        fontSize="24px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FaHome} />
      </Button>
      <Button
        variant="ghost"
        color="black"
        onClick={() => onNavChange("transaction")}
        mb={4}
        bg="orange.200"
        _hover={{ bg: "orange.300" }}
        ml={5}
        mr={5}
        w="60px"
        h="60px"
        fontSize="24px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FaHistory} />
      </Button>
      <Button
        variant="ghost"
        color="black"
        onClick={() => onNavChange("orders")}
        mb={4}
        bg="orange.200"
        _hover={{ bg: "orange.300" }}
        ml={5}
        mr={5}
        w="60px"
        h="60px"
        fontSize="24px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FaList} />
      </Button>
      <Button
        variant="ghost"
        color="black"
        onClick={() => onNavChange("approval")}
        mb={4}
        bg="orange.200"
        _hover={{ bg: "orange.300" }}
        ml={5}
        mr={5}
        w="60px"
        h="60px"
        fontSize="24px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FaCheckCircle} />
      </Button>
      <Button
        variant="ghost"
        color="black"
        onClick={() => onNavChange("create")}
        mb={4}
        bg="orange.400"
        _hover={{ bg: "orange.500" }}
        ml={5}
        mr={5}
        w="60px"
        h="60px"
        fontSize="24px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FaPlus} />
      </Button>
      
      {/* Logout Icon Button */}
      <Button
        onClick={handleLogoutWithConfirmation}
        bg="red.500"
        color="white"
        mt="auto" // This pushes the button to the bottom of the container
        w="60px"
        h="60px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={FaSignOutAlt} />
      </Button>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={isLogoutOpen} onClose={onLogoutClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to log out?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="ghost" onClick={onLogoutClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminNav;
