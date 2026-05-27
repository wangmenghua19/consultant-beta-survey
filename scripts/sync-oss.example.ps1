# 阿里云 OSS 上传示例（需先安装并配置 ossutil）
# 文档：https://help.aliyun.com/document_detail/120075.html
#
# 1. 下载 ossutil，执行 ossutil config
# 2. 复制本文件为 sync-oss.ps1，修改下面变量
# 3. npm run build 后执行 .\scripts\sync-oss.ps1

$Bucket = "oss://你的Bucket名称"
$Dist = Join-Path (Split-Path -Parent $PSScriptRoot) "dist"

if (-not (Test-Path $Dist)) {
    Write-Error "请先 npm run build"
    exit 1
}

ossutil cp -r "$Dist\*" "$Bucket/" --update --force
Write-Host "上传完成。请在 OSS 控制台确认静态网站托管与 404->index.html 已配置。"
