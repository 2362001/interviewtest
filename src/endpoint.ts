const ENDPOINT_GETALLDATA = 'http://localhost:2001/api/v1/userInfor/getAll'
const ENDPOINT_SEARCHDATA = 'http://localhost:2001/api/v1/userInfor/searchByCustomerCode'
const ENDPOINT_CREATEDATA = 'http://localhost:2001/api/v1/userInfor/createUserInfo'

const ENDPOINT_CREATEPRODUCT = 'http://localhost:2001/api/v1/product/createProduct'
const ENDPOINT_GETALLPRODUCT = 'http://localhost:2001/api/v1/product/getAllProduct'
const ENDPOINT_GETTOTALCOUNTPRODUCT = 'http://localhost:2001/api/v1/product/getSumProduct'
const ENDPOINT_GETBYCUSTOMERCODE = 'http://localhost:2001/api/v1/product/getByCustomerCode'

const ENDPOINT_CREATEPRODUCTPURCHASE = 'http://localhost:2001/api/v1/productpurchase/createProductPurchase'
const ENDPOINT_GETALLPRODUCTPURCHASE = 'http://localhost:2001/api/v1/productpurchase/getAllProductPurchase'
const ENDPOINT_GETBYCUSTOMERCODEPURCHASE = 'http://localhost:2001/api/v1/productpurchase/getByCustomerCodePurchase'
const ENDPOINT_GETTOTALCOUNTPRODUCTPURCHASE = 'http://localhost:2001/api/v1/productpurchase/getSumProductPurchase'

export {
  ENDPOINT_GETALLDATA,
  ENDPOINT_CREATEDATA,
  ENDPOINT_SEARCHDATA,
  ENDPOINT_CREATEPRODUCT,
  ENDPOINT_GETALLPRODUCT,
  ENDPOINT_GETBYCUSTOMERCODE,
  ENDPOINT_CREATEPRODUCTPURCHASE,
  ENDPOINT_GETALLPRODUCTPURCHASE,
  ENDPOINT_GETBYCUSTOMERCODEPURCHASE,
  ENDPOINT_GETTOTALCOUNTPRODUCT,
  ENDPOINT_GETTOTALCOUNTPRODUCTPURCHASE
}
