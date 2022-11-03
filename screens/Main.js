import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
// import * as Device from "expo-device";
// import * as Network from "expo-network";
// import * as Application from 'expo-application';

import { THEME_COLORS, USER_ROLE } from "../config/constants.js";

const Main = ({ navigation }) => {
  // console.log("Device", Device);
  // console.log("Network", Network);
  // console.log("Application", Application);

  return (
    <Box flex={1} safeAreaTop alignSelf="center" w="100%" background="#fff">
      <Box
        bg={THEME_COLORS.PRIMARY_COLOR}
        h="56"
        roundedBottomRight={300}
        p={5}
      >
        <Heading size="2xl" mt="5" fontWeight="600" color="#fff">
          Welcome to{" "}
          <Text fontWeight="700" color="#fff">
            Kabasi Enterprise!
          </Text>
        </Heading>
      </Box>
      <Box></Box>
      <Center flex={1}></Center>
      <Box bg={THEME_COLORS.MAIN_DARK_COLOR} p={2} borderRadius={10} m={2}>
        <HStack alignItems="center" space={3} safeAreaBottom p={1}>
          <Pressable
            flex={1}
            onPress={() =>
              navigation.navigate("Login", {
                role: USER_ROLE.ADMIN,
              })
            }
          >
            <Center>
              <Icon
                mb="1"
                as={<FontAwesome name="user" />}
                color={"#fff"}
                size="3xl"
              />
              <Text fontSize="14" color={"#fff"} bold>
                Admin / Owner
              </Text>
            </Center>
          </Pressable>
          <Pressable
            flex={1}
            onPress={() =>
              navigation.navigate("Login", {
                role: USER_ROLE.EMPLOYEE,
              })
            }
          >
            <Center>
              <Icon
                mb="1"
                as={<FontAwesome name="users" />}
                color={"#fff"}
                size="3xl"
              />
              <Text fontSize="14" color={"#fff"} bold>
                Employee / Staff
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
      {/* <Box
        bg={THEME_COLORS.PRIMARY_COLOR}
        h="56"
        top={5}
        roundedBottomRight={400}
        roundedTopLeft={500}
      ></Box> */}
    </Box>
  );
};

export default Main;
