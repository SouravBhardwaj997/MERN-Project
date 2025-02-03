import React from "react";
import { Text, Flex, Input, VStack, Button } from "@chakra-ui/react";

const CreateProduct = () => {
  return (
    <Flex minW={"90%"} alignItems={"center"} flexDirection={"column"} gap={"3"}>
      <Text
        as={"h1"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        p={"4"}
        align={"center"}
      >
        Create New Product
      </Text>

      <VStack p={"7"} bg={"blackAlpha.300"} rounded={"xl"} w={"40%"}>
        <Input placeholder="Enter Product Name:" />
        <Input placeholder="Enter price:" />
        <Input placeholder="Enter Image Url:" />
        <Button bg={"blue.400"} _hover={{ bg: "blue.500" }} mt={"2"} w={"full"}>
          Add Product
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreateProduct;
