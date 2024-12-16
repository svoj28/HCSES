import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Carousel Images
const carouselImages = [
  { src: "https://source.unsplash.com/random/800x400?nature", label: "Nature" },
  { src: "https://source.unsplash.com/random/800x400?city", label: "City" },
  { src: "https://source.unsplash.com/random/800x400?ocean", label: "Ocean" },
];

// Collage Images
const collageImages = [
  {
    src: "https://source.unsplash.com/random/400x300?mountains",
    description: "Beautiful Mountains",
  },
  {
    src: "https://source.unsplash.com/random/400x300?forest",
    description: "Serene Forest",
  },
  {
    src: "https://source.unsplash.com/random/400x300?sunset",
    description: "Gorgeous Sunset",
  },
  {
    src: "https://source.unsplash.com/random/400x300?desert",
    description: "Vast Desert",
  },
  {
    src: "https://source.unsplash.com/random/400x300?sky",
    description: "Bright Sky",
  },
];

// Reviews Data
const reviews = [
  {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    comment: "The gallery is breathtaking! I love the stunning visuals.",
  },
  {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    comment: "Amazing collection of images. Truly inspiring work!",
  },
  {
    name: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    comment: "A great experience exploring this beautiful gallery.",
  },
];

const GalleryPage = () => {
  return (
    <Box bg="white" minH="100vh" py="8">
      {/* Main Container */}
      <Box maxW="1200px" mx="auto" px="4">
        {/* Page Title */}
        <VStack spacing="4" mb="8" textAlign="center">
          <Heading as="h1" size="2xl" color="teal.500" pt={140}>
            Our Gallery
          </Heading>
        </VStack>

        {/* Carousel Section */}
        <Box mb="12" borderRadius="lg" overflow="hidden" boxShadow="lg">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {carouselImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Box position="relative">
                  <Image
                    src={item.src}
                    alt={item.label}
                    objectFit="cover"
                    width="100%"
                    height={{ base: "200px", md: "400px" }}
                  />
                  <Box
                    position="absolute"
                    bottom="4"
                    left="4"
                    bg="blackAlpha.700"
                    color="white"
                    p="2"
                    borderRadius="md"
                  >
                    <Text fontSize="lg" fontWeight="bold">
                      {item.label}
                    </Text>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* Collage Section */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {collageImages.map((item, index) => (
            <VStack
              key={index}
              boxShadow="md"
              borderRadius="lg"
              overflow="hidden"
              spacing="0"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Image src={item.src} alt={item.description} objectFit="cover" />
              <Box p="4" bg="gray.100" w="100%">
                <Text fontWeight="bold" color="gray.700" textAlign="center">
                  {item.description}
                </Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>

        {/* Reviews Section */}
        <Box mt="12">
          <Heading as="h2" size="lg" mb="6" textAlign="center" color="teal.500">
            What People Say
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {reviews.map((review, index) => (
              <VStack
                key={index}
                p="6"
                borderRadius="lg"
                boxShadow="lg"
                bg="gray.50"
                textAlign="center"
              >
                <Avatar src={review.avatar} name={review.name} size="xl" />
                <Text fontWeight="bold" fontSize="lg" color="gray.700">
                  {review.name}
                </Text>
                <Text fontSize="md" color="gray.600">
                  "{review.comment}"
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default GalleryPage;
