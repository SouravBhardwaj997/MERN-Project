import React, { useState } from "react";
import { Text, Flex, Input, VStack, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNewProduct } from "../store/featues/products/productSlice.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const CreateProduct = () => {
  const nav = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const addProduct = async () => {
    try {
      const resultAction = await dispatch(createNewProduct(product));
      console.log(resultAction);
      if (createNewProduct.fulfilled.match(resultAction)) {
        toast({
          title: "New Product added",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        setTimeout(() => {
          nav("/");
        }, 3000);
        setProduct({ name: "", price: "", imageUrl: "" });
      } else {
        throw new Error(resultAction.payload || "Failed to create a product");
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
    // nav("/");
  };
  return (
    <Flex
      minW={"90%"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={"3"}
      p={"5"}
    >
      <Text
        as={"h1"}
        fontSize={"4xl"}
        fontWeight={"bold"}
        p={"4"}
        align={"center"}
      >
        Create New Product
      </Text>

      <VStack
        p={"7"}
        bg={"blackAlpha.300"}
        rounded={"xl"}
        w={["full", "full", "40%"]}
      >
        <Input
          placeholder="Enter Product Name:"
          value={product.name}
          onChange={(e) => {
            setProduct((prevState) => ({ ...prevState, name: e.target.value }));
          }}
        />
        <Input
          placeholder="Enter price:"
          value={product.price}
          onChange={(e) =>
            setProduct((prevState) => ({ ...prevState, price: e.target.value }))
          }
        />
        <Input
          placeholder="Enter Image Url:"
          value={product.imageUrl}
          onChange={(e) =>
            setProduct((prevState) => ({
              ...prevState,
              imageUrl: e.target.value,
            }))
          }
        />
        <Button
          bg={"blue.400"}
          _hover={{ bg: "blue.500" }}
          mt={"2"}
          w={"full"}
          onClick={addProduct}
        >
          Add Product
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreateProduct;
