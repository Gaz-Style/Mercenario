$ErrorActionPreference = 'Stop'
$iconsDir = 'c:\Users\ADMIN\Downloads\IA trabajaos\Mercenario\public\icons'
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null
}

Add-Type -AssemblyName System.Drawing
$sourcePath = 'c:\Users\ADMIN\Downloads\IA trabajaos\Mercenario\public\images\weke-logo.png'
$srcImg = [System.Drawing.Image]::FromFile($sourcePath)

function Resize-ImageFile {
    param(
        [System.Drawing.Image]$Image,
        [int]$Width,
        [int]$Height,
        [string]$Destination,
        [double]$PaddingRatio = 0.85
    )

    $bmp = New-Object System.Drawing.Bitmap $Width, $Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $drawW = [int]($Width * $PaddingRatio)
    $drawH = [int]($Height * $PaddingRatio)
    $posX = [int](($Width - $drawW) / 2)
    $posY = [int](($Height - $drawH) / 2)

    $g.DrawImage($Image, $posX, $posY, $drawW, $drawH)
    $bmp.Save($Destination, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Resize-ImageFile -Image $srcImg -Width 192 -Height 192 -Destination "$iconsDir\icon-192x192.png" -PaddingRatio 0.85
Resize-ImageFile -Image $srcImg -Width 512 -Height 512 -Destination "$iconsDir\icon-512x512.png" -PaddingRatio 0.85
Resize-ImageFile -Image $srcImg -Width 512 -Height 512 -Destination "$iconsDir\icon-maskable-512x512.png" -PaddingRatio 0.70
Resize-ImageFile -Image $srcImg -Width 180 -Height 180 -Destination "$iconsDir\apple-touch-icon.png" -PaddingRatio 0.85

$srcImg.Dispose()
Write-Output "PWA Icons generated successfully in $iconsDir"
