$content = Get-Content -Path "c:/Users/JESUS 2/Documents/proyecto/nura/index.html" -Raw -Encoding UTF8

# Remove scripts and styles blocks
$content = $content -replace '(?s)<style>.*?</style>', ''
$content = $content -replace '(?s)<script>.*?</script>', ''

# Inject external links
$content = $content -replace '</head>', "    <link rel=`"stylesheet`" href=`"./assets/style.css`">`n</head>"
$content = $content -replace '</body>', "    <script src=`"./assets/script.js`"></script>`n</body>"

# Update nav links
$content = $content -replace 'href="#inicio"', 'href="index.html"'
$content = $content -replace 'href="#productos"', 'href="productos.html"'
$content = $content -replace 'href="#nosotros"', 'href="nosotros.html"'
$content = $content -replace 'href="#ingredientes"', 'href="nosotros.html#ingredientes"'
$content = $content -replace 'href="#contacto"', 'href="contacto.html"'

# Extract sections
function Get-Section {
    param([string]$content, [string]$idOrClass)
    $pattern1 = "(?is)<section[^>]*?class=['`"][^'`"]*?$idOrClass['`"][^>]*?>.*?</section>"
    $pattern2 = "(?is)<section[^>]*?id=['`"][^'`"]*?$idOrClass['`"][^>]*?>.*?</section>"
    
    if ($content -match $pattern1) {
        return $matches[0]
    } elseif ($content -match $pattern2) {
        return $matches[0]
    }
    return ""
}

$hero = Get-Section $content "hero"
$productos = Get-Section $content "productos"
$about = Get-Section $content "about"
$testimonios = Get-Section $content "testimonios"
$antes_despues = Get-Section $content "antes-despues"
$faq = Get-Section $content "faq"
$newsletter = Get-Section $content "newsletter"
$metricas = Get-Section $content "metricas-kpi"
$ingredientes = Get-Section $content "ingredientes"
$contacto = Get-Section $content "contacto"

# Create base template
$base_template = $content -replace '(?s)<section.*?</section>', '<!-- CONTENT -->'
$base_template = $base_template -replace '(?s)(<!-- CONTENT -->\s*)+', "<!-- CONTENT -->`n"

# Create pages
$index_html = $base_template -replace '<!-- CONTENT -->', "$hero`n$testimonios`n$antes_despues`n$faq`n$newsletter`n$metricas"
$productos_html = $base_template -replace '<!-- CONTENT -->', "$productos"
$nosotros_html = $base_template -replace '<!-- CONTENT -->', "$about`n$ingredientes"
$contacto_html = $base_template -replace '<!-- CONTENT -->', "$contacto"

# Write files
[IO.File]::WriteAllText("c:/Users/JESUS 2/Documents/proyecto/nura/index.html", $index_html, [System.Text.Encoding]::UTF8)
[IO.File]::WriteAllText("c:/Users/JESUS 2/Documents/proyecto/nura/productos.html", $productos_html, [System.Text.Encoding]::UTF8)
[IO.File]::WriteAllText("c:/Users/JESUS 2/Documents/proyecto/nura/nosotros.html", $nosotros_html, [System.Text.Encoding]::UTF8)
[IO.File]::WriteAllText("c:/Users/JESUS 2/Documents/proyecto/nura/contacto.html", $contacto_html, [System.Text.Encoding]::UTF8)

Write-Host "Done"
