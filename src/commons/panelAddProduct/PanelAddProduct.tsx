import { Button, Drawer, Form, Input, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import axios from 'axios'
import { AppContext } from '~/context/AppContextProvider'
import { ENDPOINT_CREATEPRODUCT, ENDPOINT_CREATEPRODUCTPURCHASE } from '~/endpoint'
import { useCustomContext } from '~/hooks/useCustomContext'
import { useLoading } from '../context/useLoading'

interface IPanelAddProduct {
  title: string
  tabKey: string
}
interface IValues {
  productCode?: string
  productName?: string
  count?: number
  productBill?: number
}
const PanelAddProduct = (props: IPanelAddProduct) => {
  const { openDrawer, setOpenDrawer, customerCode, setIsCallGetAll } = useCustomContext(AppContext)
  const { showLoading, closeLoading } = useLoading()
  const { tabKey } = props
  const [form] = useForm()

  const onClose = () => {
    setOpenDrawer(false)
    form.resetFields()
  }

  const handleSubmit = async (object: IValues, api: string) => {
    showLoading()
    try {
      await axios.post(api, object).then((response) => {
        console.log(response)
      })
    } catch (error) {
      console.log(error)
    }
    setIsCallGetAll(true)
    setOpenDrawer(false)
    closeLoading()
  }

  const onFinish = () => {
    const object = {
      ...form.getFieldsValue(),
      customerCode: customerCode
    }
    const api = tabKey === 'sales' ? ENDPOINT_CREATEPRODUCT : ENDPOINT_CREATEPRODUCTPURCHASE
    handleSubmit(object, api)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  const filterDrawFooter = (
    <Space>
      <Button onClick={onClose}>Đóng</Button>
      <Button
        type='primary'
        onClick={() => {
          form.submit()
        }}
      >
        Thêm
      </Button>
    </Space>
  )

  return (
    <Drawer title={props.title} onClose={onClose} width={500} open={openDrawer} footer={filterDrawFooter}>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        form={form}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.Item
            label='Mã mặt hàng'
            name='productCode'
            rules={[{ required: true, message: 'Vui lòng điền mã mặt hàng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Tên mặt hàng'
            name='productName'
            rules={[{ required: true, message: 'Vui lòng điền tên mặt hàng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Số lượng' name='count' rules={[{ required: true, message: 'Vui lòng điền số lượng!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Đơn giá'
            name='productBill'
            rules={[{ required: true, message: 'Vui lòng điền đầy đủ đơn giá!' }]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  )
}

export default PanelAddProduct
