import { Center, VStack, HStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  NxtLink,
  NxtButton,
  NxtInput,
  NxtHeading,
  NxtCard,
} from "../../components/common";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../../models/AuthModel";
import useNxtToast from "./../../hooks/useNxtToast";
import { login } from "../../redux/reducers/authSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
// import { useEffect } from "react";

const Login = ({ route, navigation }) => {
  const [showToast] = useNxtToast();
  const [isPending, startTransition] = useState(false);
  const dispatch = useDispatch();

  const { role } = route.params;

  // const { isLogin, isError, error, user, successMessage } = useSelector(
  //   (state) => state.auth
  // );

  const userLogin = async (values) => {
    startTransition(true);
    dispatch(login({ ...values, userRole: role }))
      .unwrap()
      .then((res) => {
        startTransition(false);
        if (res && res.status === "success") {
          showToast("success", res.message);
          if (res.data.user) {
            if (res.data.user.active) {
              navigation.navigate("Home", { role });
            } else {
              if (res.data.user.userRole === role) {
                navigation.navigate("Otp", { role });
              }
            }
          }
        } else {
          showToast("error", res.message || "Error");
          startTransition(false);
        }
      })
      .catch((err) => {
        showToast("error", err.message || "User not found!");
        startTransition(false);
      });
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: userLogin,
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  return (
    <Center
      w="100%"
      alignItems="center"
      background="coolGray.50"
      justifyContent="center"
      flex={1}
    >
      <Spinner
        visible={isPending}
        textContent={"Signing in... "}
        textStyle={{ color: "#fff" }}
      />

      <NxtCard safeArea shadow={9} pb={5} py={5}>
        <NxtHeading text={`${role.capitalize()} Login`} alignSelf="center" />
        <NxtHeading
          mt="1"
          color="coolGray.400"
          fontWeight="medium"
          size="xs"
          alignSelf="center"
          text="Sign in to continue!"
        />

        <VStack space={3} mt="5">
          <NxtInput
            type={"text"}
            label="Email or Username or Phone Number"
            placeholder="Enter your email or username or phone number"
            name="unameMail"
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
            required
          />
          <NxtInput
            type={"password"}
            label="Password"
            placeholder="Enter password"
            name="password"
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
            required
          >
            <NxtLink text="Forget Password?" alignSelf="flex-end" mt="1" />
          </NxtInput>

          <NxtButton
            text={"Sign in"}
            mt="2"
            onPress={handleSubmit}
            type="submit"
          />

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <NxtLink
              text="Sign Up"
              fontSize="sm"
              onPress={() => navigation.navigate("Signup", { role })}
            />
          </HStack>
        </VStack>
      </NxtCard>
    </Center>
  );
};

export default Login;
