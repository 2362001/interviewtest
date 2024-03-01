export interface IGeneralInfo {
  customerCode?: number
  customerName?: string
  dayVoucher?: string
  totalMoney?: string
}

export interface IProduct {
  customerCode: string
  productCode: string
  productName: string
  count: number
  productBill: number
  productTotalCount: number
}
