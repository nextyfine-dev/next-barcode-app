import { Box, Center, Image, HStack } from "native-base";
import * as Print from "expo-print";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { NxtButton, NxtText } from "../../../components/common";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { THEME_COLORS } from "../../../config/constants";
import { deleteProduct } from "../../../services/productService";
import useNxtToast from "../../../hooks/useNxtToast";
import { deleteCustomer } from "../../../services/customerService";
const BarcodeImg = require("./../../../assets/barcode.png");

export default function ShowCreatedBarcode({
  route,
  navigation,
  customer,
  cProducts,
  product,
}) {
  const [isPending, startTransition] = useState(false);
  const [showToast] = useNxtToast();

  const { data, isCustomer, isCreated } = route.params;
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <img
      src="${data.file.code}"
      style="width: 90vw;" />
  </body>
</html>
`;

  const printToFile = async () => {
    startTransition(true);
    const { uri } = await Print.printToFileAsync({ html });
    const pdfName = `${uri.slice(0, uri.lastIndexOf("/") + 1)}${
      data.file.productId || data.file.customerId
    }-${data.file.name}.pdf`;

    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });

    startTransition(false);
    await shareAsync(pdfName, {
      UTI: ".pdf",
      mimeType: "application/pdf",
      dialogTitle: "barcode",
    });
  };

  const showResMsg = (res) => {
    if (res && res.status === "success") {
      startTransition(false);
      showToast("success", res.message);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    } else {
      startTransition(false);
      showToast("error", res.message);
    }
  };

  const deleteBarcode = async (id, type = "product") => {
    startTransition(true);
    if (type === "product") {
      const res = await deleteProduct(id);
      showResMsg(res);
    } else if (type === "customer") {
      const res = await deleteCustomer(id);
      showResMsg(res);
    }
  };

  return (
    <Box>
      {data && data.file && data.file.code && (
        <Center mt={20} justifyContent="center" alignItems="center">
          <Spinner
            visible={isPending}
            textContent={"Please wait... "}
            textStyle={{ color: "#fff" }}
          />
          <Image source={BarcodeImg} width={40} height={20} alt="barcode" />
          <NxtText
            text={data.file.productId || data.file.customerId}
            color={THEME_COLORS.DARK_COLOR}
            fontSize={12}
          />
          <NxtText
            text={data.file.name}
            color={THEME_COLORS.MAIN_DARK_COLOR}
            fontSize={18}
          />
          <HStack
            // space={2}
            flexWrap="wrap"
            m={3}
          >
            <NxtButton
              text={"Create New"}
              onPress={() =>
                !isCustomer
                  ? navigation.navigate("CreateBarcode")
                  : navigation.navigate("CreateCustomer")
              }
              bg={"green.500"}
              m={1}
            />
            <NxtButton text={"Print Barcode"} onPress={printToFile} m={1} />
            <NxtButton
              text={"Go Home"}
              onPress={() => navigation.navigate("Home")}
              bg={"yellow.500"}
              m={1}
            />
            {!isCreated && (
              <NxtButton
                text={isCustomer ? "Update Customer" : "Update Product"}
                onPress={async () =>
                  !isCustomer
                    ? navigation.navigate("UpdateProduct", {
                        isUpdate: true,
                        product,
                        productId: data.file.productId,
                      })
                    : navigation.navigate("UpdateCustomer", {
                        isUpdate: true,
                        cProducts,
                        customer,
                        customerId: data.file.customerId,
                      })
                }
                bg={"blue.500"}
                m={1}
              />
            )}

            {!isCreated && (
              <NxtButton
                text={isCustomer ? "Delete Customer" : "Delete Product"}
                onPress={async () =>
                  isCustomer
                    ? await deleteBarcode(data.file.customerId, "customer")
                    : await deleteBarcode(data.file.productId)
                }
                bg={"red.500"}
                m={1}
              />
            )}
          </HStack>
        </Center>
      )}
    </Box>
  );
}
