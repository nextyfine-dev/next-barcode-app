import { Box, ScrollView } from "native-base";
import React, { memo, useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { wait } from "../../../services";
import BarCodes from "../Barcodes";

const ProductsAndCustomer = ({ navigation, isCustomer }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box p={2}>
        <BarCodes
          refreshing={refreshing}
          navigation={navigation}
          onRefresh={onRefresh}
          isCustomer={isCustomer}
        />
      </Box>
    </ScrollView>
  );
};

export default memo(ProductsAndCustomer);
