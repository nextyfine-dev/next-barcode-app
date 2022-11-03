import {
  Box,
  Center,
  HStack,
  Icon,
  Input,
  InputGroup,
  ScrollView,
  VStack,
} from "native-base";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import omit from "lodash/omit";
import { NxtCard, NxtFormLabel, NxtText } from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";

export default function Account() {
  const { user } = useSelector((state) => state.auth);

  return (
    <ScrollView>
      <Box safeArea bg="#fff">
        <Center mt={3} mb={10}>
          <NxtCard pb={10} pt={10}>
            <Icon
              alignSelf="center"
              size={90}
              as={<FontAwesome name="user-circle-o" />}
            />
            <VStack mt={5}>
              {Object.keys(
                omit(user, [
                  "active",
                  "adminId",
                  "createdAt",
                  "updatedAt",
                  "userRole",
                ])
              ).map((u, i) => (
                <VStack key={i} mt={2}>
                  <NxtFormLabel label={u.capitalize()} />
                  <Input
                    placeholder="Full Name"
                    value={user[u]}
                    borderRadius={10}
                    borderColor={THEME_COLORS.PRIMARY_COLOR}
                    bg="#fff"
                    isDisabled={true}
                  />
                </VStack>
              ))}
            </VStack>
          </NxtCard>
        </Center>
      </Box>
    </ScrollView>
  );
}
