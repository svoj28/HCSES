import { Grid, Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const MenuPage = () => {
    return (
        <Box bg="white" minHeight="100vh">
            <Heading pb={5} pt={140} bg="white" mx={40} fontSize="4xl" fontWeight="bold" color="#333">Food Menu</Heading>
            
            <Grid
                templateColumns="repeat(2, 1fr)"
                gap={6}
                bg="white"
                p={8}
                pt={10}
                mx={40}
            >
                {/* Main Dish Section */}
                <Box bg="#FDD998" borderRadius="md" p={6} boxShadow="lg inset 0 0 10px rgba(0, 0, 0, 0.1)">
                    <Heading size="lg" mb={4} fontSize="2xl" color="#6b3f00" textTransform="uppercase" letterSpacing={2}>Main Dish</Heading>
                    <Text fontWeight="bold" fontSize="lg" color="#4a4a4a">Soup</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Lobster Bisque - Creamy Lobster Soup with a touch of sherry.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Tom Yum Soup - Thai hot and sour soup with shrimp, mushrooms, and a mix of aromatic herbs.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Chicken and Rice Soup - Chicken curlets topped with marinated chicken rice and vegetables in a light broth.</Text>

                    <Text fontWeight="bold" mt={4} fontSize="lg" color="#4a4a4a">Non-Soup</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Beef Wellington - Tender beef wrapped in puff pastry with mushrooms and prosciutto.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Lamb Chops with Rosemary and Garlic - Grilled or pan-seared lamb chops with herbs.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Chicken Parmesan - Breaded chicken cutlets topped with marinara sauce and melted mozzarella.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Steak Frites - Pan-seared steak served with crispy fries.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Ratatouille - A French vegetable stew made with eggplant, zucchini, peppers, and tomatoes.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Beef Stroganoff - Sliced beef in a creamy mushroom and onion sauce, served over egg noodles.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Shrimp Scampi - Shrimp cooked in garlic butter sauce, often served with pasta.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Paella - A Spanish rice dish with seafood, chicken, and saffron.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Barbecue Ribs - Tender pork ribs glazed with barbecue sauce and slow-cooked.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Chicken Tikka Masala - Spicy Indian curry made with marinated chicken in a rich tomato-based sauce.</Text>
                </Box>

                {/* Appetizer Section */}
                <Box bg="#F5B971" borderRadius="md" p={6} boxShadow="lg inset 0 0 10px rgba(0, 0, 0, 0.1)">
                    <Heading size="lg" mb={4} fontSize="2xl" color="#6b3f00" textTransform="uppercase" letterSpacing={2}>Appetizer</Heading>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Bruschetta - Toasted baguette slices topped with diced tomatoes, basil, and garlic.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Deviled Eggs - Hardboiled eggs halved and filled with a creamy mustard-yolk mixture.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Caprese Salad Skewers - Cherry tomatoes, fresh mozzarella, and basil drizzled with balsamic glaze.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Stuffed Mushrooms - Mushrooms filled with garlic, breadcrumbs, and cheese.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Shrimp Cocktail - Chilled shrimp served with tangy cocktail sauce.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Cheese and Charcuterie Board - A selection of cheeses, cured meats, fruits, and crackers.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Spinach and Artichoke Dip - Creamy dip made with spinach, artichokes, and cheese.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Mini Crab Cakes - Crispy crab cakes served with a spicy aioli.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Cucumber Bites with Cream Cheese - Cucumber slices topped with seasoned cream cheese and herbs.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Garlic Parmesan Wings - Crispy chicken wings coated in garlic and parmesan.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Hummus with Pita Bread - A classic dip made from chickpeas served with pita.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Guacamole with Tortilla Chips - Mashed avocado with lime, cilantro, and garlic.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Stuffed Jalapeños - Jalapeños stuffed with cream cheese and wrapped in bacon.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Spicy Ribs - Fresh spicy ribs served with rice in prepared sauce.</Text>
                </Box>
            </Grid>

            <Grid
                gap={6}
                bg="white"
                p={8}
                pt={-10}
                mx={40}
            >
                {/* Desserts Section */}
                <Box bg="#85A392" borderRadius="md" p={6} boxShadow="lg inset 0 0 10px rgba(0, 0, 0, 0.1)">
                    <Heading size="lg" mb={4} fontSize="2xl" color="#6b3f00" textTransform="uppercase" letterSpacing={2}>Desserts</Heading>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Tiramisu - Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Chocolate Lava Cake - Warm chocolate cake with a gooey molten center.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Cheesecake - Creamy cheesecake on a graham cracker crust, topped with fruit or caramel.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Apple Pie - Classic pie with spiced apples, often served with vanilla ice cream.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Crème Brûlée - Custard dessert with a crispy caramelized sugar topping.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Panna Cotta - Italian creamy dessert often flavored with vanilla or coffee and served with berries.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Baklava - Flaky pastry layers filled with nuts and soaked in honey syrup.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Chocolate Mousse - Silky smooth chocolate mousse topped with whipped cream.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Lemon Sorbet - Refreshing frozen lemon dessert, perfect for cleansing the palate.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Profiteroles - Cream-filled choux pastry puffs, often topped with chocolate sauce.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Raspberry Sorbet - Sweet and tart frozen raspberry dessert.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Coconut Macaroons - Chewy coconut cookies with a hint of sweetness.</Text>
                    <Text color="#555" fontSize="md" lineHeight="1.6">Banoffee Pie - A dessert pie made with bananas, toffee, and cream.</Text>
                </Box>
            </Grid>
        </Box>
    );
};

export default MenuPage;
