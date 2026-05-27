# 将 dist 推送到 gitee 的 gitee-pages 分支（需已添加 remote: gitee）
# 用法：npm run build:gitee 后执行 .\scripts\push-gitee-pages.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"

if (-not (Test-Path (Join-Path $dist "index.html"))) {
    Write-Error "请先执行: npm run build:gitee"
}

Set-Location $root
git remote get-url gitee 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "请先添加 Gitee 远程仓库，例如："
    Write-Host '  git remote add gitee https://gitee.com/wangmenghua19/consultant-beta-survey.git'
    exit 1
}

$branch = "gitee-pages"
$tmp = Join-Path $env:TEMP "gitee-pages-deploy"
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
New-Item -ItemType Directory -Path $tmp | Out-Null
Copy-Item -Path "$dist\*" -Destination $tmp -Recurse -Force

Set-Location $tmp
git init | Out-Null
git checkout -b $branch | Out-Null
git add .
git commit -m "deploy: gitee pages static" | Out-Null
git push -f gitee "${branch}:${branch}"

Set-Location $root
Write-Host "已推送到 gitee 分支 $branch ，请在 Gitee 仓库开启 Pages 并选择该分支。"
