param (
    [string]$LibraryName,
    [string]$BatchPath
)

if (-not $LibraryName) {
    Write-Host "❌ Please provide a name."
    exit
}

$projectDir = (Get-Location).Path
$librariesPath = Join-Path $projectDir "Libraries\$LibraryName"
$projectsPath = Join-Path $projectDir "Projects\$LibraryName"

if (Test-Path $librariesPath) {
    $sourcePath = $librariesPath
} elseif (Test-Path $projectsPath) {
    $sourcePath = $projectsPath
} else {
    Write-Host "❌ '$LibraryName' not found in Libraries or Projects"
    exit
}

# Step 1: Move content to root
$itemsToMove = Get-ChildItem -Path $sourcePath
foreach ($item in $itemsToMove) {
    Move-Item -Path $item.FullName -Destination $projectDir -Force
}
$movedNames = $itemsToMove.Name

# Step 2: Delete everything except the moved files
Get-ChildItem -Path $projectDir -Force | Where-Object {
    $_.Name -notin $movedNames
} | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Step 3: Launch rename script
$renameScript = Join-Path $PSScriptRoot "rename-folder.ps1"
$parentDir = Split-Path $projectDir -Parent
$currentFolder = Split-Path $projectDir -Leaf

Start-Process powershell "-NoProfile -ExecutionPolicy Bypass -File `"$renameScript`" -OldName `"$currentFolder`" -NewName `"$LibraryName`" -ParentDir `"$parentDir`" -BatchPath `"$BatchPath`""