import type { TableProps } from 'antd'
import { Table } from 'antd'
import styles from './table.module.scss'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { IProduct } from '~/model'

interface ITableCommon {
  dataProp: IProduct[]
}
const TableCommon = (props: ITableCommon) => {
  const [isOpenTable, setIsOpenTable] = useState(false)
  const { dataProp } = props

  const columns: TableProps<IProduct>['columns'] = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => <span>{index + 1}</span>
    },
    {
      title: 'Mã mặt hàng',
      dataIndex: 'productCode',
      key: 'productCode'
    },
    {
      title: 'Tên mặt hàng',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count'
    },
    {
      title: 'Đơn giá',
      dataIndex: 'productBill',
      key: 'productBill',
      render: (value) => (value ? <span>{value} VND</span> : 'N/A')
    },
    {
      title: 'Thành tiền',
      dataIndex: 'productTotalCount',
      key: 'productTotalCount',
      render: (value) => (value ? <span>{value} VND</span> : 'N/A')
    }
  ]

  const handleOpen = () => {
    setIsOpenTable(!isOpenTable)
  }
  return (
    <div className={styles.tablecommon}>
      <div className={styles.details}>
        <span>Chi tiết</span>
        <div>
          {isOpenTable ? (
            <DownOutlined onClick={handleOpen} style={{ cursor: 'pointer' }} />
          ) : (
            <UpOutlined onClick={handleOpen} style={{ cursor: 'pointer' }} />
          )}
        </div>
      </div>
      {isOpenTable && (
        <div className={styles.divTable}>
          <Table
            style={{ width: '100%' }}
            columns={columns}
            dataSource={dataProp}
            scroll={{ x: 500 }}
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </div>
  )
}

export default TableCommon
