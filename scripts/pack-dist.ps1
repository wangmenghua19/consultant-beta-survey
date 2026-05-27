# 将 dist 打包为 zip，便于发给同事或上传任意静态托管
$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"
$out = Join-Path $root "consultant-beta-survey-dist.zip"

if (-not (Test-Path $dist)) {
  Write-Error "请先执行: npm run build"
  exit 1
}

if (Test-Path $out) { Remove-Item $out -Force }
Compress-Archive -Path "$dist\*" -DestinationPath $out
Write-Host "已生成: $out"
