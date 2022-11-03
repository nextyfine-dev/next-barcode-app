import { useEffect } from "react";
import { Center, ScrollView, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import {
  NxtButton,
  NxtInput,
  NxtHeading,
  NxtCard,
} from "../../../components/common";
import useNxtToast from "../../../hooks/useNxtToast";
import { selectOptions } from "../../../models/options";
import { initialValues, validationSchema } from "../../../models/ShopModel";
import { createNewShop } from "../../../services/shopService";

const CreateShop = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showToast] = useNxtToast();

  const { user } = useSelector((state) => state.auth);

  const createShop = async (values) => {
    const res = await createNewShop(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: createShop,
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
  } = formik;

  useEffect(() => {
    if (user) {
      setFieldValue("adminId", user.id);
    }
  }, [user]);

  return (
    <ScrollView>
      <Center
        w="100%"
        alignItems="center"
        background="coolGray.50"
        justifyContent="center"
        flex={1}
      >
        <NxtCard safeArea shadow={9} mt={20} mb={20}>
          <NxtHeading text="Create a new shop" alignSelf="center" />

          <VStack space={3} mt="5">
            <NxtInput
              type={"text"}
              label="Shop Name"
              placeholder="Enter your shop name"
              name="name"
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              required
            />
            <NxtInput
              type={"text"}
              label="Address"
              placeholder="Enter shop address"
              name="address"
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              textArea
              required
            />
            <NxtInput
              type={"text"}
              label="Details"
              placeholder="Enter more details"
              name="details"
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              textArea
            />
            <NxtButton text={"Submit"} mt="2" onPress={handleSubmit} />
          </VStack>
        </NxtCard>
      </Center>
    </ScrollView>
  );
};

export default CreateShop;
