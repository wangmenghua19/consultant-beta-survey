import { Layout, Typography } from 'antd'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const { Header, Content, Footer } = Layout
const { Title, Text } = Typography

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
  maxWidth?: number
}

export function PageShell({ title, subtitle, children, maxWidth = 720 }: PageShellProps) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 24px',
          height: 'auto',
          lineHeight: 1.4,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Title level={4} style={{ margin: 0, fontSize: 18 }}>
          {title}
        </Title>
        {subtitle && (
          <Text type="secondary" style={{ fontSize: 12 }}>
            {subtitle}
          </Text>
        )}
      </Header>
      <Content style={{ padding: '24px 16px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'transparent', color: '#8c8c8c' }}>
        <Text type="secondary" style={{ fontSize: 12 }}>
          顾问跟进系统内测问卷 · 内部使用
        </Text>
        {' · '}
        <Link to="/admin" style={{ fontSize: 12 }}>
          管理入口
        </Link>
      </Footer>
    </Layout>
  )
}
