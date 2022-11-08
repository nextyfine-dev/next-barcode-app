import { useEffect, useState } from "react";
import BarcodeDetails from "./BarcodeDetails";
import ShowCreatedBarcode from "./ShowCreatedBarcode";
import omit from "lodash/omit";

export default function BarcodeAndProductDetails({ route, navigation }) {
  const { detail, isCustomer } = route.params;

  const [data, setData] = useState({
    params: { data: { file: {} }, isCustomer },
  });

  useEffect(() => {
    if (detail) {
      if (detail.Files) {
        setData({ params: { data: { file: detail.Files[0] }, isCustomer } });
      } else {
        const data = omit(detail, ["Product"]);
        setData({ params: { data: { file: { ...data } }, isCustomer } });
      }
    }
  }, [detail]);

  return (
    <>
      <ShowCreatedBarcode route={data} navigation={navigation} />
      <BarcodeDetails data={detail.Product || detail} />
    </>
  );
}
