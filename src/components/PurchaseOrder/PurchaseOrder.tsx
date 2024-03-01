import { PlusCircleFilled } from '@ant-design/icons'
import { Button } from 'antd'
import GeneralInfo from '~/commons/generalinfor/GeneralInfo'
import PanelAddProduct from '~/commons/panelAddProduct/PanelAddProduct'
import TableCommon from '~/commons/table/TableCommon'
import { AppContext } from '~/context/AppContextProvider'
import { useCustomContext } from '~/hooks/useCustomContext'
import styles from './index.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ENDPOINT_GETTOTALCOUNTPRODUCTPURCHASE } from '~/endpoint'

const PurchaseOrder = () => {
  const { dataProductPurchase, setOpenDrawer, customerCode, isCallGetAll } = useCustomContext(AppContext)
  const [sumProduct, setSumProduct] = useState<A>(0)

  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

  const getSumProduct = async () => {
    try {
      await axios.get(ENDPOINT_GETTOTALCOUNTPRODUCTPURCHASE).then((response) => {
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
    <div className={styles.purchaseorder}>
      <span className={styles.title}>Đơn mua hàng</span>
      <GeneralInfo sum={sumProduct?.totalCount} />
      <PanelAddProduct title='Đơn mua' tabKey='purchase' />
      {dataProductPurchase.length > 0 && (
        <>
          <div style={{ display: 'flex' }}>
            <Button icon={<PlusCircleFilled />} type='primary' htmlType='submit' onClick={handleOpenDrawer}>
              Thêm đơn mua
            </Button>
          </div>
          <TableCommon dataProp={dataProductPurchase} />
        </>
      )}
    </div>
  )
}

export default PurchaseOrder
