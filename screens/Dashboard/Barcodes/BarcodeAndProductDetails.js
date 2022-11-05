import { useEffect, useState } from "react";
import BarcodeDetails from "./BarcodeDetails";
import ShowCreatedBarcode from "./ShowCreatedBarcode";
import omit from "lodash/omit";

export default function BarcodeAndProductDetails({ route, navigation }) {
  const { detail } = route.params;
  const [data, setData] = useState({ params: { data: { file: {} } } });

  useEffect(() => {
    if (detail) {
      if (detail.Files) {
        setData({ params: { data: { file: detail.Files[0] } } });
      } else {
        const data = omit(detail, ["Product"]);
        setData({ params: { data: { file: { ...data } } } });
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
