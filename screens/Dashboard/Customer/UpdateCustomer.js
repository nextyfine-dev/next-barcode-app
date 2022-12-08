import CreateCustomer from "./CreateCustomer";

const UpdateCustomer = ({ route }) => {
    const { isUpdate, customer, cProducts } = route.params;

    return <CreateCustomer isUpdate={isUpdate} customer={customer} cProducts={cProducts} />

}

export default UpdateCustomer;