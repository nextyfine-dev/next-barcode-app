import { useEffect, useState } from "react";
import BarcodeDetails from "./BarcodeDetails";
import ShowCreatedBarcode from "./ShowCreatedBarcode";
import omit from "lodash/omit";

export default function BarcodeAndProductDetails({ route, navigation }) {
  const { detail, isCustomer } = route.params;

  const [customer, setCustomer] = useState(null);
  const [cProducts, setCproducts] = useState(null);
  const [product, setProduct] = useState(null);


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
      <ShowCreatedBarcode route={data} navigation={navigation} customer={customer} cProducts={cProducts} product={product} />
      <BarcodeDetails data={detail.Product || detail} setCustomerDetail={setCustomer} setCproductsDetail={setCproducts} setProductDetail={setProduct} />
    </>
  );
}
