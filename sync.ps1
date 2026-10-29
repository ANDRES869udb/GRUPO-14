# Script de sincronización automática con GitHub
param (
    [string]$Mensaje = "Auto-update: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$env:Path = "$env:LOCALAPPDATA\Programs\Git\cmd;$env:LOCALAPPDATA\Programs\Git\ucrt64\bin;$env:Path"

Write-Host "Verificando cambios..." -ForegroundColor Cyan
git status -s

git add -A
$cambios = git status -s

if ($cambios) {
    Write-Host "Creando commit..." -ForegroundColor Cyan
    git commit -m $Mensaje
    Write-Host "Subiendo cambios a GitHub..." -ForegroundColor Cyan
    git push origin main
    Write-Host "Sincronización completada con éxito." -ForegroundColor Green
} else {
    Write-Host "No hay cambios pendientes por sincronizar." -ForegroundColor Yellow
}
