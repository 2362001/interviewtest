import { AppContext } from '~/context/AppContextProvider'
import { useCustomContext } from '~/hooks/useCustomContext'
import styles from './generalinfo.module.scss'

interface IGeneralInfo {
  sum?: number
}
const GeneralInfo = (props: IGeneralInfo) => {
  const { sum } = props
  const { userInfo } = useCustomContext(AppContext)
  const dataInfor = [
    {
      id: 1,
      title: 'Mã khách hàng',
      info: userInfo[0]?.customerCode
    },
    {
      id: 2,
      title: 'Ngày chứng từ',
      info: userInfo[0]?.dayVoucher
    },
    {
      id: 3,
      title: 'Tên khách hàng',
      info: userInfo[0]?.customerName
    },
    {
      id: 4,
      title: 'Tổng tiền',
      info: sum
    }
  ]

  return (
    <div className={styles.generalinfo}>
      <ul className={styles.container}>
        {dataInfor.map((item) => (
          <li key={item.id}>
            <span className={styles.title}>{item.title}</span>
            <div className={styles.info}>{item.info}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GeneralInfo
