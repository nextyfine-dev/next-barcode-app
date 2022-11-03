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
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import omit from "lodash/omit";
import {
  NxtButton,
  NxtCard,
  NxtFormLabel,
  NxtText,
} from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { logOut } from "../../../services/authService";
import { clearAuthState } from "../../../redux/reducers/authSlice";

export default function Account({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
                  "password",
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
                  />
                </VStack>
              ))}
            </VStack>
            <NxtButton
              text={"Log Out"}
              mt={5}
              bg="red.500"
              onPress={async () => {
                await logOut();
                dispatch(clearAuthState());
              }}
            />
          </NxtCard>
        </Center>
      </Box>
    </ScrollView>
  );
}
