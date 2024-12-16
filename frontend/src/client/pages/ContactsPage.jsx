import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  VStack,
  HStack,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const ContactUsPage = () => {
  return (
    <Box bg="white" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box maxW="800px" p="6" boxShadow="lg" rounded="md" bg="white">
        <Heading as="h1" size="2xl" mb="4" textAlign="center">
          Contact Us
        </Heading>
        <Text textAlign="center" fontSize="lg" color="gray.600" mb="8">
          Reach out to us using any of the methods below. We'd love to hear from you!
        </Text>

        {/* Contact Details */}
        <VStack spacing={6} align="stretch">
          <HStack spacing={4}>
            <FaPhone size="24px" color="#3182CE" />
            <Text fontSize="lg">
              Call us:{" "}
              <Link href="tel:+123456789" color="teal.500" fontWeight="bold">
                +63938 351 2878
              </Link>
            </Text>
          </HStack>

          <HStack spacing={4}>
            <FaEnvelope size="24px" color="#3182CE" />
            <Text fontSize="lg">
              Email us:{" "}
              <Link href="mailto:contact@company.com" color="teal.500" fontWeight="bold">
              ralphbrianm@gmail.com
              </Link>
            </Text>
          </HStack>

          {/* Social Media */}
          <Box>
      <Heading as="h3" size="md" mb="3">
        Connect with us on Social Media
      </Heading>
      <HStack spacing={4}>
        <IconButton
          as="a"
          href="https://facebook.com"
          target="_blank"
          aria-label="Facebook"
          icon={<FaFacebook />}
          size="lg"
          colorScheme="facebook"
        />
        <IconButton
          as="a"
          href="https://twitter.com"
          target="_blank"
          aria-label="Twitter"
          icon={<FaTwitter />}
          size="lg"
          colorScheme="twitter"
        />
        <IconButton
          as="a"
          href="https://linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
          icon={<FaLinkedin />}
          size="lg"
          colorScheme="linkedin"
        />
      </HStack>
    </Box>

          {/* Physical Address */}
          <Box>
            <Heading as="h3" size="md" mb="3">
              Visit our Store
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Harvest Catering Services & Event Styling, Mendez, Cavite
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
