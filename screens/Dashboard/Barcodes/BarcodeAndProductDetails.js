import { useEffect, useState } from "react";
import BarcodeDetails from "./BarcodeDetails";
import CreatedBarcode from "./CreatedBarcode";
import omit from "lodash/omit";

export default function BarcodeAndProductDetails({ route }) {
  const { detail } = route.params;
  const [data, setData] = useState({ params: { data: { file: {} } } });

  useEffect(() => {
    if (detail) {
      const data = omit(detail, ["Product"]);
      setData({ params: { data: { file: { ...data } } } });
    }
  }, [detail]);

  return (
    <>
      <CreatedBarcode route={data} />
      <BarcodeDetails data={detail.Product} />
    </>
  );
}
