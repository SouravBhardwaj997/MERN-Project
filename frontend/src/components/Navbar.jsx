import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { useColorMode } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  //   const colorModeValue = useColorMode();
  //   console.log(colorModeValue);
  return (
    <Container minW={"90%"} paddingY={"10px"}>
      <Flex justifyContent={"space-between"}>
        <Link to={"/"}>
          <Text
            as={"h1"}
            fontSize={"3xl"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Product Store 🛒
          </Text>
        </Link>
        <HStack>
          <Button onClick={toggleColorMode}>
            {colorMode == "dark" ? (
              <LuSun style={{ fontSize: "1.5rem" }} />
            ) : (
              <LuMoon style={{ fontSize: "1.5rem" }} />
            )}
          </Button>

          <Link to={"/create"}>
            <Button>
              <IoMdAdd style={{ fontSize: "1.5rem" }} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
