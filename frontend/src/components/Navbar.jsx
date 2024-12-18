import React, { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Container, 
  Flex, 
  HStack, 
  Text, 
  useColorMode, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ModalCloseButton, 
  Input, 
  Box,
  List,
  ListItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { PlusSquareIcon } from "@chakra-ui/icons";

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import MainLogo from '../assets/images/main/Main Logo.png'

import Home from '../assets/images/icons/Home.svg'
import Catering from '../assets/images/icons/Catering.svg'
import Events from '../assets/images/icons/Events.svg'
import Contact from '../assets/images/icons/Contacts.svg'
import TrackOrder from '../assets/images/icons/TrackOrder.svg'
import AddEvent from '../assets/images/icons/AddEvent.svg'


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation(); 
  const navigate = useNavigate();  
  const [orderID, setOrderID] = useState('');
  const {
    isOpen: isNotifOpen,
    onOpen: onNotifOpen,
    onClose: onNotifClose
  } = useDisclosure();
  const {
    isOpen: isItemDetailOpen,
    onOpen: onItemDetailOpen,
    onClose: onItemDetailClose
  } = useDisclosure();
  const {
    isOpen: isItemTrackDetailOpen,
    onOpen: onItemTrackDetailOpen,
    onClose: onItemTrackDetailClose
  } = useDisclosure();
  const {
    isOpen: isTrackingModalOpen,
    onOpen: onTrackingModalOpen,
    onClose: onTrackingModalClose
  } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose
  } = useDisclosure();

  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [trackedOrder, setTrackedOrder] = useState(null);

  const [orderId, setOrderId] = useState('');


  const [notifications, setNotifications] = useState([]);

  
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const cancelRef = useRef();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    if (notifications.length === 0 && isNotifOpen) {
      fetchNotifications();
    }
  }, [isNotifOpen]);

  const fetchNotifications = async () => {
    try {
      const response = await Promise.all([
        fetch("/api/adminAppr"),
        fetch("/api/cart")
      ]);
      
      const [adminResponse, cartsResponse] = response;
      
      if (!adminResponse.ok || !cartsResponse.ok) {
        throw new Error('API request failed');
      }
      
      const adminData = await adminResponse.json();
      const cartsData = await cartsResponse.json();
      
      dispatch(updateNotifications({
        adminAppr: adminData.data || [],
        cart: cartsData.data || []
      }));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };


  
  

  const handleRemoveNotification = async (id, source) => {
    try {
      await fetch(`/api/${source}/${id}`, {
        method: "DELETE",
      });
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  };








  const handleItemClick = (item) => {
    console.log("Selected item:", item); 
    setSelectedItem(item || {});
    onItemDetailOpen();
  };

  const handleSubmitOrderID = async () => {
    if (!orderID) {
      alert("Please enter a valid Order ID");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${orderID}`);
      const data = await response.json();

      if (response.ok) {
        setTrackedOrder(data);
        setSelectedItem(data); 
        onTrackingModalClose(); 
        onItemTrackDetailOpen(); 
        setOrderID('');
      } else {
        alert(data.message || "Cart not found");
      }
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      alert("Error fetching cart");
    }
  };

  const handleLogoutWithConfirmation = () => {
    onLogoutOpen();  
  };

  // Logout confirmation modal action
  const handleLogout = () => {
    
    localStorage.removeItem('user');  
    navigate('/');  
    onLogoutClose(); 
  };

  const isUserLoggedIn = !!localStorage.getItem('user');  

  const isAdminRoute = location.pathname.includes('admin');

if (isAdminRoute) return null;

  return (
    <Container 
    maxW={""} 
    px={5} 
    py={5} 
    position="fixed" 
    zIndex={9999} 
    bg={"#FFDEA7"} 
    width={"100%"}         
    alignItems={"center"}
    justifyContent={"space-between"}>
    <Flex
      alignItems={"center"} 
      justifyContent={"space-between"}
      flexDir={{ base: "column", sm: "row" }} 
      wrap="wrap"
    >
      <Image
        src={MainLogo} 
        alt="Event Styling"
        width={{ base: "40%", sm: "25%" }}
        height="auto"
        objectFit="cover"
        borderRadius="md"
      />


        <HStack spacing={2} alignItems={"center"}>
          {location.pathname === "/admin/create" && (
            <Link to="/admin/create">
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
          )}

          {location.pathname.includes("/admin") && (
            <>
              {notifications && notifications.length === 0 ? (
        <Text>No Notifications</Text>
      ) : (
        <List spacing={3}>
          {notifications.map((notif) => (
            <ListItem
              key={notif._id}
              p={2}
              border="1px solid #ccc"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <span>{notif.message} ({notif.source})</span>
              <Checkbox
                onChange={() => handleRemoveNotification(notif._id, notif.source)}
                colorScheme="green"
              />
            </ListItem>
          ))}
        </List>
      )}

              <Link to="/admin/inventory">
                <Button>Inventory</Button>
              </Link>

               {/* Navbar Login/Logout section */}
          <nav>
            {isUserLoggedIn ? (
              <div>
                <span>{user?.email}</span>
                <Button onClick={handleLogoutWithConfirmation}>Logout</Button>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Signup</Button>
                </Link>
              </div>
            )}
          </nav>
            </>
          )}
          



       
  <Flex justify="space-evenly" align="center" wrap="wrap">
    
    {/* Home */}
    <Link to="/">
      <Button
        variant="link"
        colorScheme="orange"
        flexDirection="column"
        size="lg"
        padding="10px"
        pl="20px"
        pt="15px"
        _active={{
          transform: "scale(0.95)", 
        }}
        transition="transform 0.2s ease-in-out" 
      >
        <Image
          src={Home}
          alt="Home"
          _hover={{ filter: "brightness(0) invert(1)" }} 
          transition="filter 0.2s ease"
        />
      </Button>
    </Link>

    {/* Catering */}
    <Menu>
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="orange"
        flexDirection="column"
        size="lg"
        pl="20px"
        pt="5px"
        _hover={{
          filter: "brightness(0) invert(1)" 
        }}
        _active={{
          transform: "scale(0.95)", 
        }}
        transition="filter 0.2s ease"
      >
        <Box
          _hover={{ filter: "invert(1)" }} 
          transition="filter 0.2s ease"
        >
          <Image src={Catering} alt="Catering" />
        </Box>
      </MenuButton>
      <MenuList bg="#FFDEA7">
      <Link to="/menu">
        <MenuItem
          bg="#FFDEA7"
          _hover={{
            bg: "white", 
          }}
        >
          <Text color="#C84F04">Menu</Text>
        </MenuItem>
        </Link>

        <Link to="/offers"> 
        <MenuItem
          bg="#FFDEA7"
          _hover={{
            bg: "white", 
          }}
          onClick={() => alert("Order clicked")}
        >
          <Text color="#C84F04">Offers</Text>
        </MenuItem>
        </Link>
      </MenuList>
      
    </Menu>

    {/* Events */}
    <Menu>
      <MenuButton
        as={Button}
        variant="link"
        colorScheme="orange"
        flexDirection="column"
        size="lg"
        pl="20px"
        _hover={{
          filter: "brightness(0) invert(1)" 
        }}
        _active={{
          transform: "scale(0.95)", 
        }}
        transition="filter 0.2s ease"
      >
        <Box
          _hover={{ filter: "invert(1)" }} 
          transition="filter 0.2s ease"
        >
          <Image src={Events} alt="Events" />
        </Box>
      </MenuButton>
      <MenuList bg="#FFDEA7">
      <Link to="/packages">
        <MenuItem
          bg="#FFDEA7"
          _hover={{
            bg: "white",
          }}
          onClick={() => alert("Menu clicked")}
        >
          <Text color="#C84F04">Packages</Text>
        </MenuItem>
</Link>

<Link to="/gallery">
        <MenuItem
          bg="#FFDEA7"
          _hover={{
            bg: "white",
          }}
          onClick={() => alert("Order clicked")}
        >
          <Text color="#C84F04">Gallery</Text>
        </MenuItem>
        </Link>
      </MenuList>
    </Menu>

    {/* Contacts */}
    <Link to="/contactus">
    <Button
      variant="link"
      colorScheme="orange"
      flexDirection="column"
      size="lg"
      pl="20px"
      _active={{
        transform: "scale(0.95)", 
      }}
      transition="transform 0.2s ease-in-out"
    >
      <Image
        src={Contact}
        alt="Contact Us"
        _hover={{ filter: "brightness(0) invert(1)" }} 
        transition="filter 0.2s ease"
      />
    </Button>
    </Link>

    {/* Track Order */}
    <Button
      variant="link"
      colorScheme="orange"
      flexDirection="column"
      size="lg"
      pl="20px"
      onClick={onTrackingModalOpen}
      _active={{
        transform: "scale(0.95)",
      }}
      transition="transform 0.2s ease-in-out"
    >
      <Image
        src={TrackOrder}
        alt="Track your order"
        _hover={{ filter: "brightness(0) invert(1)" }} 
        transition="filter 0.2s ease"
      />
    </Button>

    {/* Add Event - Circular Button */}
    <Link to="/addevent">
    <Button
  variant="link"
  borderRadius="full"  
  width="50px"        
  height="50px"        
  display="flex"
  justifyContent="center"
  alignItems="center"
  ml={10}                
  bg="orange.400"      
  _hover={{
    bg: "orange.100",   
    transform: "scale(1.1)",  
  }}
  _active={{
    transform: "scale(0.95)",  
  }}
  transition="all 0.2s ease-in-out"
>
  <Image
    src={AddEvent}      
    alt="Icon"
    boxSize="30px"      
    objectFit="cover"    
    _hover={{ filter: "brightness(0) invert(1)" }} 
    transition="filter 0.2s ease"
  />
</Button>
</Link>


  </Flex>








          {/* Theme Toggle Button */}
          {/* <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button> */}

         
        </HStack>
      </Flex>

      {/* Notification Modal */}
      <Modal isOpen={isNotifOpen} onClose={onNotifClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Notifications</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        {notifications && notifications.length === 0 ? (
  <Text>No Notifications</Text>
) : (
  <List spacing={3}>
    {notifications.map((notif) => (
      <ListItem
        key={notif._id}
        p={2}
        border="1px solid #ccc"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <span>{notif.message} ({notif.source})</span>
        <Checkbox
          onChange={() => handleRemoveNotification(notif._id, notif.source)}
          colorScheme="green"
        />
      </ListItem>
    ))}
  </List>
)}

        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onNotifClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
      {/* Item Detail Modal */}
      {/* {selectedItem && (
        <Modal isOpen={isItemDetailOpen} onClose={onItemDetailClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Order Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Text><strong>Price:</strong> ${selectedItem.price}</Text>
                <Text><strong>Customer Name:</strong> {selectedItem.customer_name}</Text>
                <Text><strong>Delivery Date:</strong> {selectedItem.delivery_date}</Text>
                <Text><strong>Address:</strong> {selectedItem.address}</Text>
                <Text><strong>Additional Info:</strong> {selectedItem.additional_info}</Text>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onItemDetailClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )} */}

      {/* Tracking Modal */}
      <Modal isOpen={isTrackingModalOpen} onClose={onTrackingModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Track Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Input
                placeholder="Enter Order ID"
                value={orderID}
                onChange={(e) => setOrderID(e.target.value)}
                size="md"
                variant="outline"
                focusBorderColor="teal.400"
                borderRadius="md"
                borderColor="gray.300"
              />
            </Box>
            <Button colorScheme="teal" onClick={handleSubmitOrderID}>Confirm</Button>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onTrackingModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Logout Confirmation Modal */}
      <AlertDialog isOpen={isLogoutOpen} leastDestructiveRef={cancelRef} onClose={onLogoutClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to logout?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onLogoutClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Navbar;
