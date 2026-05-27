import { App as AntApp, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { medicalB2bTheme } from '@/theme/medical-b2b'

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={medicalB2bTheme}>
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  )
}
