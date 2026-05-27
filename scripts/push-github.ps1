# 推送 main 到 GitHub（需本机可访问 github.com，且登录 wangmenghua19）
Set-Location (Split-Path -Parent $PSScriptRoot)
Write-Host "Pushing to origin/main ..."
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "OK: https://github.com/wangmenghua19/consultant-beta-survey"
} else {
    Write-Host "Push failed. Try: GitHub web edit wrangler.toml (see DEPLOY-CLOUDFLARE.md)"
    exit 1
}
