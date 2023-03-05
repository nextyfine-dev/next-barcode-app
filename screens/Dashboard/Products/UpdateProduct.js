import CreateProduct from "./CreateProduct";

const UpdateProduct = ({ route, navigation }) => {
  const { isUpdate, product, productId } = route.params;

  return (
    <CreateProduct
      isUpdate={isUpdate}
      product={product}
      productId={productId}
      navigation={navigation}
    />
  );
};

export default UpdateProduct;
