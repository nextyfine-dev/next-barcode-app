import ProductsAndCustomer from "../components/ProductsAndCustomer";

export default function Customer({ navigation }) {
  return <ProductsAndCustomer navigation={navigation} isCustomer={true} />;
}
