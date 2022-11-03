import { Center, HStack, Icon, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NxtCard, NxtText } from "../../components/common";

export default function CreateCode({ navigation }) {
  return (
    <Center mt={4}>
      <HStack space={5} alignItems="center">
        <Pressable
          width="45%"
          onPress={() => navigation.navigate("CreateBarcode")}
        >
          <NxtCard>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="circle-edit-outline" />}
              size="3xl"
              alignSelf="center"
            />

            <NxtText text={"New Product"} alignSelf="center" />
          </NxtCard>
        </Pressable>
        <Pressable width="45%">
          <NxtCard>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="account-edit-outline" />}
              size="3xl"
              alignSelf="center"
            />
            <NxtText text={"New Customer"} alignSelf="center" />
          </NxtCard>
        </Pressable>
      </HStack>
    </Center>
  );
}
