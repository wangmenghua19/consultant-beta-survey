import { Form, Input, Select } from 'antd'
import { POSITION_OPTIONS } from '@/constants/questions'

const trimRequired = (message: string) => [
  { required: true, message },
  { whitespace: true, message },
]

export function BasicInfoSection() {
  return (
    <>
      <Form.Item
        name="storeName"
        label="门店"
        rules={[...trimRequired('请输入门店名称'), { max: 50, message: '最多 50 个字符' }]}
        normalize={(v) => (typeof v === 'string' ? v.trim() : v)}
      >
        <Input placeholder="请输入门店名称" maxLength={50} />
      </Form.Item>
      <Form.Item
        name="respondentName"
        label="姓名"
        rules={[...trimRequired('请输入您的姓名'), { max: 20, message: '最多 20 个字符' }]}
        normalize={(v) => (typeof v === 'string' ? v.trim() : v)}
      >
        <Input placeholder="请输入您的姓名" maxLength={20} />
      </Form.Item>
      <Form.Item
        name="position"
        label="岗位"
        rules={[{ required: true, message: '请选择岗位' }]}
      >
        <Select placeholder="请选择岗位" options={POSITION_OPTIONS} />
      </Form.Item>
    </>
  )
}
