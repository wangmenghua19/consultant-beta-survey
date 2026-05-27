import { Button, Card, Divider, Form } from 'antd'
import { PageShell } from '@/components/layout/PageShell'
import { BasicInfoSection } from '@/components/survey/BasicInfoSection'
import { QuestionBlock } from '@/components/survey/QuestionBlock'
import { SubmitSuccess } from '@/components/survey/SubmitSuccess'
import {
  AI_ACCEPTANCE_OPTIONS,
  BETA_WILLINGNESS_OPTIONS,
  CO_BUILD_OPTIONS,
  EXPECTED_PROBLEM_OPTIONS,
  FEEDBACK_WILLINGNESS_OPTIONS,
  ISSUE_BEHAVIOR_OPTIONS,
  NEW_SYSTEM_OPTIONS,
} from '@/constants/questions'
import { useSurveyDraft } from '@/hooks/useSurveyDraft'
import { useSurveySubmit } from '@/hooks/useSurveySubmit'
import type { SurveyFormValues } from '@/types/survey'

export default function SurveyPage() {
  const [form] = Form.useForm<SurveyFormValues>()
  const { submit, loading, submitted, reset } = useSurveySubmit()
  const { onValuesChange } = useSurveyDraft(form)

  if (submitted) {
    return (
      <PageShell title="顾问跟进系统 · 内测问卷">
        <SubmitSuccess
          onAgain={() => {
            reset()
            form.resetFields()
          }}
        />
      </PageShell>
    )
  }

  return (
    <PageShell
      title="顾问跟进系统 · 内测问卷"
      subtitle="约 3 分钟，帮助我们找到合适的内测伙伴"
    >
      <Card styles={{ body: { padding: '24px 20px' } }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={submit}
          onValuesChange={onValuesChange}
          scrollToFirstError
          initialValues={{ expectedProblems: [] }}
        >
          <Divider orientation="left" plain>
            基础信息
          </Divider>
          <BasicInfoSection />

          <Divider orientation="left" plain>
            使用情况与意愿
          </Divider>

          <QuestionBlock
            name="newSystemBehavior"
            label="1. 平时遇到新系统/新功能时，你一般会？"
            type="radio"
            options={NEW_SYSTEM_OPTIONS}
          />

          <QuestionBlock
            name="betaWillingness"
            label="2. 是否愿意参与本次内测？"
            type="radio"
            options={BETA_WILLINGNESS_OPTIONS}
          />

          <QuestionBlock
            name="expectedProblems"
            label="3. 更希望系统帮你解决什么问题？（可多选）"
            type="checkbox"
            options={EXPECTED_PROBLEM_OPTIONS}
            rules={[
              {
                required: true,
                message: '请至少选择一项',
                type: 'array',
                min: 1,
              },
            ]}
            otherFieldName="expectedProblemsOther"
          />

          <QuestionBlock
            name="issueBehavior"
            label="4. 如果发现系统问题，你通常会？"
            type="radio"
            options={ISSUE_BEHAVIOR_OPTIONS}
          />

          <QuestionBlock
            name="feedbackWillingness"
            label="5. 是否愿意主动反馈问题？"
            type="radio"
            options={FEEDBACK_WILLINGNESS_OPTIONS}
          />

          <QuestionBlock
            name="aiAcceptance"
            label="6. 对 AI 辅助功能的接受程度？"
            type="radio"
            options={AI_ACCEPTANCE_OPTIONS}
          />

          <QuestionBlock
            name="coBuildWillingness"
            label="7. 是否愿意参与后续优化共建？"
            type="radio"
            options={CO_BUILD_OPTIONS}
          />

          <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              提交问卷
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageShell>
  )
}
