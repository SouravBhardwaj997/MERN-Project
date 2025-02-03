import { Container, Text } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Container minW={"90%"}>
      <Text
        as={"h1"}
        fontSize={"2xl"}
        fontWeight={"bold"}
        align={"center"}
        p={"4"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
      >
        Current Projects 🚀
      </Text>
    </Container>
  );
};

export default Home;
