#!/bin/bash

echo "🔄 Refreshing IDE and resolving dependency issues..."

# Clean and rebuild
echo "📦 Cleaning and rebuilding project..."
./mvnw clean compile -q

# Force dependency resolution
echo "🔍 Resolving dependencies..."
./mvnw dependency:resolve -q

# Generate IDE files
echo "⚙️  Generating IDE configuration..."
./mvnw eclipse:clean eclipse:eclipse -q

# Create a .vscode/settings.json for VS Code if it doesn't exist
if [ ! -d ".vscode" ]; then
    mkdir -p .vscode
fi

cat > .vscode/settings.json << EOF
{
    "java.configuration.updateBuildConfiguration": "automatic",
    "java.compile.nullAnalysis.mode": "automatic",
    "java.project.sourcePaths": [
        "src/main/java"
    ],
    "java.project.outputPath": "target/classes",
    "java.project.referencedLibraries": [
        "lib/**/*.jar"
    ],
    "java.dependency.packagePresentation": "hierarchical",
    "java.dependency.syncWithFolderExplorer": true,
    "java.maven.downloadSources": true,
    "java.maven.downloadJavadoc": true
}
EOF

echo "✅ IDE refresh complete!"
echo ""
echo "📋 Next steps:"
echo "1. Restart your IDE/editor"
echo "2. If using VS Code, reload the window (Cmd+Shift+P -> 'Developer: Reload Window')"
echo "3. If using IntelliJ, invalidate caches (File -> Invalidate Caches)"
echo "4. Wait for the Java language server to reindex"
echo ""
echo "🔧 If issues persist, try:"
echo "   - Delete .vscode folder and restart VS Code"
echo "   - Delete .idea folder and restart IntelliJ"
echo "   - Run: ./mvnw clean install -DskipTests" 