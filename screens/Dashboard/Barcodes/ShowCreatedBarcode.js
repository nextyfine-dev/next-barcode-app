import { Box, Center, Image, HStack } from "native-base";
import * as Print from "expo-print";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { NxtButton, NxtText } from "../../../components/common";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { THEME_COLORS } from "../../../config/constants";
const BarcodeImg = require("./../../../assets/barcode.png");

export default function ShowCreatedBarcode({ route, navigation }) {
  const [isPending, startTransition] = useState(false);

  const { data } = route.params;
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
      data.file.productId
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
            text={data.file.productId}
            color={THEME_COLORS.DARK_COLOR}
            fontSize={12}
          />
          <NxtText
            text={data.file.name}
            color={THEME_COLORS.MAIN_DARK_COLOR}
            fontSize={18}
          />
          <HStack
            space={2}
            flexWrap="wrap"
            m={5}
            justifyContent="center"
            alignItems="center"
          >
            <NxtButton
              text={"Create New"}
              onPress={() => navigation.navigate("CreateBarcode")}
              bg={"green.500"}
            />
            <NxtButton text={"Print Barcode"} onPress={printToFile} />
            <NxtButton
              text={"Go Home"}
              onPress={() => navigation.navigate("Home")}
              bg={"red.500"}
            />
          </HStack>
        </Center>
      )}
    </Box>
  );
}
