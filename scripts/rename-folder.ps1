param (
    [string]$OldName,
    [string]$NewName,
    [string]$ParentDir,
    [string]$BatchPath
)

Start-Sleep -Seconds 2
Set-Location $ParentDir

# Rename folder
if (Test-Path $OldName) {
    Rename-Item -Path $OldName -NewName $NewName -Force
    Write-Host "✅ Renamed '$OldName' to '$NewName'"
}

# Delete batch file if exists
if ($BatchPath -and (Test-Path $BatchPath)) {
    Remove-Item $BatchPath -Force
}