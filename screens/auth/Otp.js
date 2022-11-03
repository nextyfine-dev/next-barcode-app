import { Center, Box, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { NxtButton, NxtInput, NxtLink } from "../../components/common";
import { USER_ROLE } from "../../config/constants.js";
import { otpInitialValues, otpValidationSchema } from "../../models/AuthModel";
import useNxtToast from "../../hooks/useNxtToast";
import { verifyAccount } from "../../redux/reducers/authSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";

const Otp = ({ route, navigation }) => {
  const [showToast] = useNxtToast();
  const dispatch = useDispatch();
  const [isPending, startTransition] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { role } = route.params;

  const submitOtp = (values) => {
    startTransition(true);

    dispatch(verifyAccount({ ...values, email: user.email }))
      .unwrap()
      .then((res) => {
        startTransition(false);
        if (res && res.status === "success") {
          showToast("success", res.message);

          if (res.data.token && res.data.user && res.data.user.active) {
            navigation.navigate("Home", { role });
            // if (res.data.user.userRole === USER_ROLE.ADMIN) {
            //   navigation.navigate("CreateShop", { role });
            // } else {
            //   navigation.navigate("Home", { role });
            // }
          }
        } else {
          startTransition(false);
          showToast("error", res.message || "Error");
        }
      })
      .catch((err) => {
        showToast("error", err.message);
        startTransition(false);
      });
  };

  const showResendOtp = () => {
    let isShow = false;
    setTimeout(() => {
      isShow = true;
    }, 20000);

    if (isShow) {
      return <NxtLink text="Resend OTP" alignSelf="center" mt="3" />;
    } else return <></>;
  };

  const formik = useFormik({
    initialValues: otpInitialValues,
    validationSchema: otpValidationSchema,
    onSubmit: submitOtp,
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  return (
    <Center
      w="100%"
      alignItems="center"
      background="#fff"
      justifyContent="center"
      flex={1}
    >
      <Spinner
        visible={isPending}
        textContent={"Verifying account... "}
        textStyle={{ color: "#fff" }}
      />
      <Box safeArea p="2" w="90%" maxW="290" alignSelf="center">
        <VStack space={3} mt="5">
          <NxtInput
            label="Enter Otp"
            type="text"
            placeholder={"586***"}
            name="otp"
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
            required
          />
          <NxtButton text={"Submit"} onPress={handleSubmit} />
        </VStack>
        {showResendOtp()}
      </Box>
    </Center>
  );
};

export default Otp;
