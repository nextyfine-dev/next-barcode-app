import { Box, Divider } from "native-base";

import CreateCode from "../../../layouts/barcode/CreateCode";
import BarCodes from "../Barcodes";

export default function EmployeeHome({ refreshing, navigation }) {
  return (
    <Box>
      <CreateCode navigation={navigation} />
      <BarCodes refreshing={refreshing} navigation={navigation} />
      <Divider mt={8} />
      <BarCodes
        refreshing={refreshing}
        navigation={navigation}
        isCustomer={true}
      />
    </Box>
  );
}
