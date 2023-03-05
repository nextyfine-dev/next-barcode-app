import {
  Box,
  Center,
  Divider,
  Icon,
  Input,
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
  RenderInput,
} from "../../../components/common";
import { THEME_COLORS } from "../../../config/constants";
import { logOut, updatePass } from "../../../services/authService";
import { clearAuthState } from "../../../redux/reducers/authSlice";
import { useState } from "react";
import {
  passValidation,
  updatePassInitialValues,
} from "../../../models/AuthModel";
import useNxtToast from "../../../hooks/useNxtToast";
import { validateValues } from "../../../services";
import Spinner from "react-native-loading-spinner-overlay";

export default function Account() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showToast] = useNxtToast();

  const [values, setValues] = useState(updatePassInitialValues);
  const [isPending, startTransition] = useState(false);

  const handleChange = (value, name) => {
    setValues((prev) => {
      const data = { ...prev };
      data[name] = value;
      return data;
    });
  };

  const handleSubmit = async () => {
    startTransition(true);
    const isError = validateValues(passValidation, values);
    if (isError) {
      startTransition(false);
      showToast("error", isError);
    } else {
      const res = await updatePass({
        ...values,
        id: user.adminId || user.employeeId,
        userRole: user.userRole,
      });
      startTransition(false);

      if (res.status !== "success") return showToast("error", res.message);
      setValues(updatePassInitialValues);
      return showToast("success", res.message);
    }
  };

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
                  "employeeId"
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
            <Divider mt={4} />

            <VStack mt={1}>
              <RenderInput
                label={"Old Password"}
                placeholder="Enter old password"
                type={"password"}
                required
                onChangeText={(value) => handleChange(value, "oldPassword")}
                value={values["oldPassword"]}
              />
              <RenderInput
                label={"New Password"}
                placeholder="Enter a new password"
                type={"password"}
                required
                onChangeText={(value) => handleChange(value, "newPassword")}
                value={values["newPassword"]}
              />
              <RenderInput
                label={"Confirm Password"}
                placeholder="Confirm the password"
                type={"password"}
                required
                onChangeText={(value) => handleChange(value, "confirmPassword")}
                value={values["confirmPassword"]}
              />

              <NxtButton
                text={"Update Password"}
                mt={5}
                bg="green.500"
                onPress={handleSubmit}
              />
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
          <Spinner
            visible={isPending}
            textContent={"Updating password"}
            textStyle={{ color: "#fff" }}
          />
        </Center>
      </Box>
    </ScrollView>
  );
}
