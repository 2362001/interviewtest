import type { TabsProps } from 'antd'
import { Button, Form, Input, Tabs } from 'antd'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import LazyLoading from './commons/context/Lazyloading'
import { useLoading } from './commons/context/useLoading'
import PurchaseOrder from './components/PurchaseOrder/PurchaseOrder'
import SalesOrder from './components/SalesOrder/SalesOrder'
import { AppDetailProvider } from './context/AppContextProvider'
import { ENDPOINT_GETBYCUSTOMERCODE, ENDPOINT_GETBYCUSTOMERCODEPURCHASE, ENDPOINT_SEARCHDATA } from './endpoint'
import { IGeneralInfo, IProduct } from './model'

interface IValues {
  customercode: string
}

function App() {
  const { isLoading, showLoading, closeLoading } = useLoading()
  const [userInfo, setUserInfo] = useState<IGeneralInfo[]>([])
  const [dataProduct, setDataProduct] = useState<IProduct[]>([])
  const [dataProductPurchase, setDataProductPurchase] = useState<IProduct[]>([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [customerCode, setCustomerCode] = useState('')
  const [isCallGetAll, setIsCallGetAll] = useState(false)
  const inputRef = useRef(null)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Quản lý đơn bán',
      children: <SalesOrder />
    },
    {
      key: '2',
      label: 'Quản lý đơn mua',
      children: <PurchaseOrder />
    }
  ]

  const handleSearchCustomerCode = async (values: A) => {
    try {
      await axios
        .post(ENDPOINT_SEARCHDATA, {
          customerCode: values?.customercode
        })
        .then((response) => {
          setUserInfo(response.data.data)
          if (inputRef && inputRef.current) {
            const inputElement = inputRef.current as HTMLInputElement
            inputElement.focus()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  console.log(dataProduct)
  console.log(dataProductPurchase)

  const getProductByCustomerCode = async (values: A) => {
    console.log(values)

    try {
      await axios
        .post(ENDPOINT_GETBYCUSTOMERCODE, {
          customerCode: values?.customercode
        })
        .then((response) => {
          setDataProduct(response.data.data)
          setIsCallGetAll(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getProductPurchaseByCustomerCode = async (values: A) => {
    try {
      await axios
        .post(ENDPOINT_GETBYCUSTOMERCODEPURCHASE, {
          customerCode: values?.customercode
        })
        .then((response) => {
          setDataProductPurchase(response.data.data)
          setIsCallGetAll(false)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isCallGetAll) {
      getProductByCustomerCode({ customercode: customerCode })
      getProductPurchaseByCustomerCode({ customercode: customerCode })
    }
  }, [isCallGetAll])

  const onFinish = (values: IValues) => {
    showLoading()
    setCustomerCode(values?.customercode)
    handleSearchCustomerCode(values)
    getProductByCustomerCode(values)
    getProductPurchaseByCustomerCode(values)
    setTimeout(() => {
      closeLoading()
    }, 3000)
  }

  const onFinishFailed = (errorInfo: A) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <AppDetailProvider
      value={{
        userInfo,
        isCallGetAll,
        setIsCallGetAll,
        dataProduct,
        customerCode,
        dataProductPurchase,
        openDrawer,
        setOpenDrawer
      }}
    >
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div style={{ display: 'flex' }}>
          <Form.Item
            label='Nhập mã khách hàng'
            name='customercode'
            rules={[{ required: true, message: 'Vui lòng điền mã khách hàng!' }]}
          >
            <Input ref={inputRef} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Tabs defaultActiveKey='1' items={items} />
      {isLoading && <LazyLoading />}
    </AppDetailProvider>
  )
}

export default App
