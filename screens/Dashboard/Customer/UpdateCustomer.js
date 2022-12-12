import CreateCustomer from "./CreateCustomer";

const UpdateCustomer = ({ route, navigation }) => {
    const { isUpdate, customer, cProducts, customerId } = route.params;

    return <CreateCustomer isUpdate={isUpdate} customer={customer} cProducts={cProducts} customerId={customerId} navigation={navigation} />

}

export default UpdateCustomer;