import { Box } from "native-base";

import CreateCode from "../../../layouts/barcode/CreateCode";
import BarCodes from "../Barcodes";

export default function AdminHome({ refreshing, navigation }) {
  return (
    <Box>
      <CreateCode navigation={navigation} />
      <BarCodes refreshing={refreshing} navigation={navigation} />
    </Box>
  );
}
