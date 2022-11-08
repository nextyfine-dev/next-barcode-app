import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { NxtButton, NxtFormLabel, NxtText } from "../../../components/common";
import useNxtToast from "../../../hooks/useNxtToast";
import { getProductDetails } from "../../../services/productService";
import omit from "lodash/omit";
import { BARE_URL, THEME_COLORS } from "../../../config/constants";

export default function BarcodeDetails({ setData, data }) {
  const [showToast] = useNxtToast();
  const [details, setDetails] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const getValues = (obj) => {
    const values = omit(obj, [
      "active",
      "adminId",
      "createdAt",
      "isLoved",
      "isPined",
      "updatedAt",
      "Files",
      "files",
      "fileId",
      "type",
      "code",
      "fileType",
      "Customer",
    ]);
    return values;
  };

  const getDetails = async () => {
    const res = await getProductDetails(data);
    if (res && res.status === "success") {
      res.data.products.length > 0 && showToast("success", res.message);
      const values = getValues(res.data.products[0]);
      setDetails(values);
    } else {
      showToast("error", res.message || "Data not found!");
    }
  };

  useEffect(() => {
    if (data) {
      if (typeof data === "string") {
        getDetails();
      } else if (typeof data === "object") {
        const values = getValues(data);
        setDetails(values);
      }
    }
  }, [data]);

  return (
    <ScrollView>
      {details && (
        <Box mt={5} p={4} mb={5}>
          {details &&
            Object.keys(details).map(
              (key, i) =>
                details[key] &&
                key !== "product_images" && (
                  <VStack
                    key={i}
                    mt={2}
                    onTouchStart={() => setIsDisabled(false)}
                  >
                    <NxtFormLabel label={key.capitalize()} />
                    <Input
                      value={details[key]}
                      borderRadius={10}
                      borderColor={THEME_COLORS.PRIMARY_COLOR}
                      bg="#fff"
                      // onKeyPress={}
                      isDisabled={isDisabled}
                      onBlur={() => setIsDisabled(true)}
                    />
                  </VStack>
                )
            )}
          <HStack space={3} flexWrap="wrap" flexDirection="row" mt={4}>
            {details.product_images &&
              JSON.parse(details.product_images) &&
              JSON.parse(details.product_images).map((img, i) => (
                <Center key={i} mt={2}>
                  <Image
                    src={`${BARE_URL}/files/${img}`}
                    w={100}
                    h={100}
                    alt="product image"
                  />
                </Center>
              ))}
          </HStack>

          {setData && (
            <Center mt={5}>
              <NxtButton
                onPress={() => setData(false)}
                bg="red.400"
                text="Close"
                width={100}
              />
            </Center>
          )}
        </Box>
      )}
    </ScrollView>
  );
}
