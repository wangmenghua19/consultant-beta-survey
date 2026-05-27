import { useMemo } from 'react'
import { Card, Result, Typography } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import { ExportToolbar } from '@/components/admin/ExportToolbar'
import { FilterBar } from '@/components/admin/FilterBar'
import { ResponseTable } from '@/components/admin/ResponseTable'
import { PageShell } from '@/components/layout/PageShell'
import { useSurveyList } from '@/hooks/useSurveyList'

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY ?? '内测管理'

export default function AdminPage() {
  const [searchParams] = useSearchParams()
  const key = searchParams.get('key')
  const authorized = key === ADMIN_KEY

  const { filteredItems, allItems, filters, setFilters, loading, reload, storeOptions } =
    useSurveyList()

  const stats = useMemo(() => {
    const a = filteredItems.filter((i) => i.recommendLevel === 'A').length
    const seed = filteredItems.filter((i) => i.tags.includes('种子用户')).length
    return { a, seed }
  }, [filteredItems])

  if (!authorized) {
    return (
      <PageShell title="管理页" maxWidth={480}>
        <Card>
          <Result
            status="403"
            title="无权访问"
            subTitle={
              <>
                请在 URL 后添加访问参数，例如：
                <Typography.Text code>/admin?key={ADMIN_KEY}</Typography.Text>
              </>
            }
            extra={
              <Link to="/">返回填写页</Link>
            }
          />
        </Card>
      </PageShell>
    )
  }

  return (
    <PageShell title="内测问卷 · 管理" subtitle="筛选种子用户、导出名单" maxWidth={1200}>
      <Card>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
          当前筛选共 <strong>{filteredItems.length}</strong> 条（全部 {allItems.length} 条）· A
          级 {stats.a} 人 · 种子用户标签 {stats.seed} 人
        </Typography.Paragraph>

        <FilterBar filters={filters} onChange={setFilters} storeOptions={storeOptions} />

        <ExportToolbar filtered={filteredItems} total={allItems.length} onCleared={reload} />

        <ResponseTable data={filteredItems} loading={loading} />
      </Card>
    </PageShell>
  )
}
