import { Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { labelOf, labelsOfProblems } from '@/constants/questions'
import type { SurveySubmission } from '@/types/survey'
import { RECOMMEND_LEVEL_COLORS, RECOMMEND_LEVEL_LABELS } from '@/utils/recommend-level'

interface ResponseTableProps {
  data: SurveySubmission[]
  loading?: boolean
}

export function ResponseTable({ data, loading }: ResponseTableProps) {
  const columns: ColumnsType<SurveySubmission> = [
    {
      title: '提交时间',
      dataIndex: 'submittedAt',
      width: 160,
      render: (v: string) => dayjs(v).format('MM-DD HH:mm'),
    },
    {
      title: '门店',
      width: 120,
      render: (_, r) => r.answers.storeName,
    },
    {
      title: '姓名',
      width: 80,
      render: (_, r) => r.answers.respondentName || '—',
    },
    {
      title: '岗位',
      width: 80,
      render: (_, r) => labelOf('position', r.answers.position),
    },
    {
      title: '推荐等级',
      width: 110,
      render: (_, r) => (
        <Tag color={RECOMMEND_LEVEL_COLORS[r.recommendLevel]}>
          {RECOMMEND_LEVEL_LABELS[r.recommendLevel]}
        </Tag>
      ),
    },
    {
      title: '开放度',
      width: 72,
      dataIndex: 'opennessScore',
      sorter: (a, b) => a.opennessScore - b.opennessScore,
    },
    {
      title: '标签',
      width: 200,
      render: (_, r) => (
        <>
          {r.tags.map((t) => (
            <Tag key={t} style={{ marginBottom: 4 }}>
              {t}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '内测意愿',
      width: 100,
      render: (_, r) => labelOf('betaWillingness', r.answers.betaWillingness),
    },
    {
      title: 'AI接受',
      width: 100,
      render: (_, r) => labelOf('aiAcceptance', r.answers.aiAcceptance),
    },
    {
      title: '期望解决的问题',
      ellipsis: true,
      render: (_, r) => (
        <Typography.Text ellipsis style={{ maxWidth: 180 }}>
          {labelsOfProblems(r.answers.expectedProblems, r.answers.expectedProblemsOther)}
        </Typography.Text>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 20, showSizeChanger: true, showTotal: (t) => `共 ${t} 条` }}
      scroll={{ x: 1100 }}
      size="small"
    />
  )
}
