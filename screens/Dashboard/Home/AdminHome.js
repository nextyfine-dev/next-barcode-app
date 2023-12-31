import { Box, Divider } from "native-base";
// import { NxtText } from "../../../components/common";

import CreateCode from "../../../layouts/barcode/CreateCode";
import BarCodes from "../Barcodes";

export default function AdminHome({ refreshing, navigation, onRefresh }) {
  return (
    <Box>
      <CreateCode navigation={navigation} />
      <BarCodes
        refreshing={refreshing}
        navigation={navigation}
        onRefresh={onRefresh}
      />
      <Divider mt={8} />
      <BarCodes
        refreshing={refreshing}
        navigation={navigation}
        isCustomer={true}
      />
    </Box>
  );
}
