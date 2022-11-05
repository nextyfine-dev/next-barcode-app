import { Modal } from "native-base";
import { useEffect, useState } from "react";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { NxtButton, RenderInput } from "../../../components/common";
import Spinner from "react-native-loading-spinner-overlay";
import { v4 } from "uuid";

const PrintBarcodes = ({ barcodes, isPrinting, setIsPrinting }) => {
  const [fileName, setFileName] = useState("");
  const [imgs, setImgs] = useState("");
  const [isPending, startTransition] = useState(false);

  const html = `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
  ${imgs}
  </body>
</html>`;

  const printToFile = async () => {
    startTransition(true);
    const { uri } = await Print.printToFileAsync({ html });
    const pdfName =
      fileName.length > 0
        ? `${uri.slice(
            0,
            uri.lastIndexOf("/") + 1
          )}${fileName.toLowerCase()}.pdf`
        : `${uri.slice(
            0,
            uri.lastIndexOf("/") + 1
          )}${v4()}-products-barcode.pdf`;

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

  useEffect(() => {
    if (barcodes) {
      const codes = [];
      for (const barcode of barcodes) {
        codes.push(`<img
            src="${barcode.code}"
            style="width: 40vw;" />`);
      }
      setImgs(codes.join(" "));
    }
  }, [barcodes.length]);

  return (
    <Modal
      isOpen={isPrinting}
      onClose={() => setIsPrinting(false)}
      safeAreaTop={true}
    >
      <Modal.Content
        width={"100%"}
        borderRadius={0}
        marginBottom={0}
        marginTop="auto"
      >
        <Modal.CloseButton />
        <Modal.Header>Print Barcodes</Modal.Header>
        <Modal.Body pb={10}>
          <Spinner
            visible={isPending}
            textContent={"Please wait... "}
            textStyle={{ color: "#fff" }}
          />
          <RenderInput
            value={fileName}
            label="Type a file name"
            onChangeText={(value) => setFileName(value)}
            placeholder="Create a new file name for barcode pdf"
          />
          <NxtButton text="Enter" mt={4} onPress={printToFile} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default PrintBarcodes;
