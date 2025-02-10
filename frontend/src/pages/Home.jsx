import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAllProducts,
  deleteProduct,
  updateProduct,
} from "../store/featues/products/productSlice";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Toast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
const Home = () => {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList.items);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });
  const toast = useToast();
  const [id, setId] = useState("");
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const deleteItem = async (id) => {
    const result = await dispatch(deleteProduct(id));
    console.log(result);
    if (deleteProduct.fulfilled.match(result)) {
      toast({
        title: "Product Deleted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdatingItem = async () => {
    const result = await dispatch(updateProduct({ product, id }));
    if (updateProduct.fulfilled.match(result)) {
      toast({
        title: "Product Updated Succesfully",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } else {
      console.log("not matched");
      toast({
        title: "Unable to update",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
    onClose();
  };
  return (
    <Container minW={"90%"}>
      <Text
        as={"h1"}
        fontSize={["xl", "2xl"]}
        fontWeight={"bold"}
        align={"center"}
        p={"4"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
      >
        Current Products 🚀
      </Text>
      {!productsList ? (
        <Text
          fontSize={"xl"}
          fontWeight={"medium"}
          align={"center"}
          p={"4"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          No Product Found{" "}
          <Link
            style={{
              textDecoration: "underline",
              color: "white",
            }}
            to={"/create"}
          >
            Create a new Product
          </Link>
        </Text>
      ) : (
        <SimpleGrid my={5} columns={[1, 2, 3]} spacing={7}>
          {productsList?.map((el) => (
            <Card maxW="sm" key={el._id}>
              <CardBody>
                <Image
                  src={el.imageUrl}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  h={250}
                  w={"full"}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{el.name}</Heading>

                  <Text color="blue.600" fontSize="2xl">
                    Rs. {el.price}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => deleteItem(el._id)}
                  >
                    <FaTrash />
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="blue"
                    onClick={() => {
                      onOpen();
                      setProduct({
                        name: el.name,
                        price: el.price,
                        imageUrl: el.imageUrl,
                      });
                      setId(el._id);
                    }}
                  >
                    <MdModeEdit />
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <VStack p={"7"} bg={"blackAlpha.300"} rounded={"xl"}>
            <Input
              placeholder="Enter Product Name:"
              value={product.name}
              onChange={(e) => {
                setProduct((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />
            <Input
              placeholder="Enter price:"
              value={product.price}
              onChange={(e) =>
                setProduct((prevState) => ({
                  ...prevState,
                  price: e.target.value,
                }))
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
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                bg={"blue.400"}
                _hover={{ bg: "blue.500" }}
                onClick={(e) => {
                  handleUpdatingItem();
                }}
              >
                Update
              </Button>
            </ModalFooter>
          </VStack>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Home;
