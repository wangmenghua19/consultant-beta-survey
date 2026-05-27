import { Button, Card, Result } from 'antd'
import { Link } from 'react-router-dom'

interface SubmitSuccessProps {
  onAgain: () => void
}

export function SubmitSuccess({ onAgain }: SubmitSuccessProps) {
  return (
    <Card>
      <Result
        status="success"
        title="感谢参与内测"
        subTitle="您的反馈将帮助我们筛选合适的内测伙伴，并优化顾问跟进系统与 AI 辅助能力。产品团队可能会与您联系。"
        extra={[
          <Button type="primary" key="again" onClick={onAgain}>
            再填一份
          </Button>,
          <Button key="home">
            <Link to="/">返回首页</Link>
          </Button>,
        ]}
      />
    </Card>
  )
}
