import { Box, Center, Pressable, Image } from "native-base";
import * as Print from "expo-print";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { NxtButton } from "../../../components/common";
import { shareAsync } from "expo-sharing";
const BarcodeImg = require("./../../../assets/barcode.png");

export default function CreatedBarcode({ route, navigation }) {
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
    startTransition(false);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <Box>
      {data && data.file && data.file.code && (
        <Center mt={20}>
          <Spinner
            visible={isPending}
            textContent={"Please wait... "}
            textStyle={{ color: "#fff" }}
          />
          <Image source={BarcodeImg} width={20} height={10} alt="barcode" />

          <Pressable mt={5}>
            <NxtButton text={"Print Barcode"} onPress={printToFile} />
          </Pressable>
        </Center>
      )}
    </Box>
  );
}
