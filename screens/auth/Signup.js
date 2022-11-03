import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Center,
  VStack,
  HStack,
  Text,
  Radio,
  Icon,
  ScrollView,
} from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { useFormik } from "formik";
import omit from "lodash/omit";

import {
  NxtLink,
  NxtButton,
  NxtInput,
  NxtHeading,
  NxtCard,
  NxtFormLabel,
} from "../../components/common";
import { THEME_COLORS, USER_ROLE } from "../../config/constants.js";
import {
  signUpInitialValues,
  signUpValidationSchema,
} from "../../models/AuthModel";
import { register } from "../../redux/reducers/authSlice";
import useNxtToast from "../../hooks/useNxtToast";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";

const Signup = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [showToast] = useNxtToast();
  const [isPending, startTransition] = useState(false);

  const { role } = route.params;

  const userRegister = async (values) => {
    startTransition(true);
    values = role === USER_ROLE.ADMIN ? omit(values, ["ref"]) : values;
    dispatch(register(values))
      .unwrap()
      .then((res) => {
        startTransition(false);
        if (res.status === "success") {
          showToast("success", res.message);

          USER_ROLE.ADMIN
            ? navigation.navigate("Otp", { role })
            : navigation.navigate("Login", { role });
        } else {
          showToast("error", res.message);
          startTransition(false);
        }
      })
      .catch((err) => {
        showToast("error", err.message);
        startTransition(false);
      });
  };

  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: userRegister,
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (role === USER_ROLE.ADMIN || role === USER_ROLE.EMPLOYEE) {
      setFieldValue("userRole", role);
    }
  }, [role]);

  return (
    <ScrollView>
      <Center
        w="100%"
        alignItems="center"
        background="coolGray.50"
        justifyContent="center"
        flex={1}
      >
        <Spinner
          visible={isPending}
          textContent={"Signing Up... "}
          textStyle={{ color: "#fff" }}
        />
        <NxtCard safeArea shadow={9} mt={10} mb={20}>
          <NxtHeading
            text={`${role.capitalize()} Register`}
            alignSelf="center"
          />
          <NxtHeading
            mt="1"
            color="coolGray.400"
            fontWeight="medium"
            size="xs"
            alignSelf="center"
            text="Create your new account!"
          />

          <VStack space={3} mt="5">
            {role === USER_ROLE.EMPLOYEE && (
              <NxtInput
                type={"text"}
                label="Referral code"
                placeholder="Enter the referral code"
                name="ref"
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
                required
              />
            )}
            <NxtInput
              type={"text"}
              label="Full name"
              placeholder="Enter your full name"
              name="fullName"
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              required
            />
            <NxtFormLabel label="Select gender" required />
            <Radio.Group
              name="gender"
              accessibilityLabel="Select gender"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.gender}
              error={errors.gender}
              isInvalid={!!touched.gender && !!errors.gender}
              required
            >
              <HStack space={5}>
                <Radio
                  value="male"
                  size="md"
                  icon={<Icon as={<Fontisto name="male" />} size={24} />}
                >
                  <Text color={THEME_COLORS.PRIMARY_COLOR}>Male</Text>
                </Radio>
                <Radio
                  value="female"
                  size="md"
                  icon={<Icon as={<Fontisto name="female" />} size={24} />}
                >
                  <Text color={THEME_COLORS.PRIMARY_COLOR}>Female</Text>
                </Radio>
                <Radio
                  value="other"
                  size="md"
                  icon={<Icon as={<Fontisto name="male" />} size={24} />}
                >
                  <Text color={THEME_COLORS.PRIMARY_COLOR}>Other</Text>
                </Radio>
              </HStack>
            </Radio.Group>
            <NxtInput
              type={"text"}
              label="Email"
              name={"email"}
              placeholder="Enter your email"
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              required
            />
            <NxtInput
              type={"text"}
              label="Phone number"
              placeholder="Enter your phone number"
              name={"phoneNumber"}
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
              name={"password"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              required
            />
            <NxtInput
              type={"password"}
              label="Confirm password"
              placeholder="Confirm the password"
              name={"confirmPassword"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              required
            />

            <NxtButton text={"Signup"} mt="2" onPress={handleSubmit} />

            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already registered?{" "}
              </Text>
              <NxtLink
                text="Login"
                fontSize="sm"
                onPress={() => navigation.navigate("Login", { role })}
              />
            </HStack>
          </VStack>
        </NxtCard>
      </Center>
    </ScrollView>
  );
};

export default Signup;
