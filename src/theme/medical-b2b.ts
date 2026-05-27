import type { ThemeConfig } from 'antd'

export const medicalB2bTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    fontSize: 14,
    colorBgLayout: '#f5f7fa',
  },
  components: {
    Card: {
      borderRadiusLG: 8,
    },
    Form: {
      labelFontSize: 14,
    },
  },
}
