import { PlusCircleFilled } from '@ant-design/icons'
import { Button } from 'antd'
import GeneralInfo from '~/commons/generalinfor/GeneralInfo'
import TableCommon from '~/commons/table/TableCommon'
import { AppContext } from '~/context/AppContextProvider'
import { useCustomContext } from '~/hooks/useCustomContext'
import styles from './index.module.scss'
import PanelAddProduct from '~/commons/panelAddProduct/PanelAddProduct'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ENDPOINT_GETTOTALCOUNTPRODUCT } from '~/endpoint'
const SalesOrder = () => {
  const { dataProduct, setOpenDrawer, customerCode, isCallGetAll } = useCustomContext(AppContext)
  const [sumProduct, setSumProduct] = useState<A>(0)
  console.log(sumProduct)

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }
  const getSumProduct = async () => {
    try {
      await axios.get(ENDPOINT_GETTOTALCOUNTPRODUCT).then((response) => {
        setSumProduct(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (customerCode) {
      getSumProduct()
    }
  }, [customerCode])

  useEffect(() => {
    if (isCallGetAll) {
      getSumProduct()
    }
  }, [isCallGetAll])

  return (
    <div className={styles.salesorder}>
      <span className={styles.title}>Đơn bán hàng</span>
      <GeneralInfo sum={sumProduct?.totalCount} />

      <PanelAddProduct title='Đơn bán' tabKey='sales' />
      {dataProduct.length > 0 && (
        <>
          <div style={{ display: 'flex' }}>
            <Button icon={<PlusCircleFilled />} type='primary' htmlType='submit' onClick={handleOpenDrawer}>
              Thêm đơn bán
            </Button>
          </div>
          <TableCommon dataProp={dataProduct} />
        </>
      )}
    </div>
  )
}

export default SalesOrder
