import { ScrollView } from "native-base";
import React, { useCallback, useState } from "react";
import { RefreshControl } from "react-native";
import { wait } from "../../../services";
import BarCodes from "../Barcodes";

export default function Products({ navigation }) {
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
      <BarCodes
        refreshing={refreshing}
        navigation={navigation}
        onRefresh={onRefresh}
      />
    </ScrollView>
  );
}
