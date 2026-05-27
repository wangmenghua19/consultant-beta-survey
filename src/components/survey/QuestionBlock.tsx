import { Checkbox, Form, Input, Radio } from 'antd'
import type { Rule } from 'antd/es/form'
import type { OptionItem } from '@/types/survey'

type QuestionType = 'radio' | 'checkbox'

interface QuestionBlockProps<T extends string = string> {
  name: string | string[]
  label: string
  type: QuestionType
  options: OptionItem<T>[]
  rules?: Rule[]
  /** 当 checkbox 选中 other 时显示补充输入 */
  otherFieldName?: string
  otherPlaceholder?: string
}

export function QuestionBlock<T extends string = string>({
  name,
  label,
  type,
  options,
  rules = [{ required: true, message: '请选择' }],
  otherFieldName,
  otherPlaceholder = '请简要说明',
}: QuestionBlockProps<T>) {
  return (
  <>
    <Form.Item name={name} label={label} rules={rules}>
      {type === 'radio' ? (
        <Radio.Group>
          {options.map((opt) => (
            <Radio key={opt.value} value={opt.value} style={{ display: 'block', marginBottom: 8 }}>
              {opt.label}
            </Radio>
          ))}
        </Radio.Group>
      ) : (
        <Checkbox.Group>
          {options.map((opt) => (
            <Checkbox key={opt.value} value={opt.value} style={{ display: 'block', marginBottom: 8 }}>
              {opt.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      )}
    </Form.Item>
    {otherFieldName && type === 'checkbox' && (
      <Form.Item noStyle shouldUpdate={(prev, cur) => prev[name as string] !== cur[name as string]}>
        {({ getFieldValue }) => {
          const selected = getFieldValue(name as string) as string[] | undefined
          if (!selected?.includes('other')) return null
          return (
            <Form.Item
              name={otherFieldName}
              label="其他说明"
              rules={[{ required: true, message: '请填写其他说明' }]}
            >
              <Input.TextArea rows={2} placeholder={otherPlaceholder} maxLength={200} showCount />
            </Form.Item>
          )
        }}
      </Form.Item>
    )}
  </>
  )
}
