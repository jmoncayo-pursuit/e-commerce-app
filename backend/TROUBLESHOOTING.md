# 🔧 Backend Troubleshooting Guide

## 🚨 IDE Issues (Red Squiggles)

If you're seeing red squiggles in your IDE, follow these steps in order:

### Step 1: Quick Fix

```bash
./refresh-ide.sh
```

### Step 2: Manual IDE Refresh

#### For VS Code:

1. **Reload Window**: `Cmd+Shift+P` → "Developer: Reload Window"
2. **Restart Java Language Server**: `Cmd+Shift+P` → "Java: Restart Language Server"
3. **Clear Java Cache**: `Cmd+Shift+P` → "Java: Clean Java Language Server Workspace"

#### For IntelliJ IDEA:

1. **Invalidate Caches**: `File` → `Invalidate Caches and Restart`
2. **Reload Maven Project**: Right-click on `pom.xml` → `Maven` → `Reload Project`

### Step 3: Nuclear Option

If the above doesn't work:

```bash
# Delete IDE-specific folders
rm -rf .vscode .idea target

# Clean and rebuild everything
./mvnw clean install -DskipTests

# Regenerate IDE files
./mvnw eclipse:clean eclipse:eclipse
```

### Step 4: Verify Dependencies

```bash
# Check if validation dependencies are resolved
./mvnw dependency:tree | grep validation

# Should show:
# jakarta.validation:jakarta.validation-api:jar:3.0.2:compile
```

## 🔍 Common Issues & Solutions

### 1. "jakarta.validation cannot be resolved"

**Cause**: IDE not recognizing Spring Boot 3.x validation dependencies
**Solution**:

- Run `./refresh-ide.sh`
- Restart your IDE
- Wait for Java language server to reindex

### 2. "Valid cannot be resolved to a type"

**Cause**: Same as above - IDE indexing issue
**Solution**: Same as above

### 3. "JwtTokenProvider cannot be resolved"

**Cause**: We removed this class and replaced it with JwtService
**Solution**: The code has been updated to use JwtService instead

### 4. "Repository cannot be resolved"

**Cause**: Missing @Repository annotations
**Solution**: Already fixed - all repositories now have @Repository annotations

## ✅ Verification Checklist

After running fixes, verify:

- [ ] `./mvnw clean compile` succeeds
- [ ] No compilation errors in terminal
- [ ] All imports resolve correctly
- [ ] No red squiggles in IDE

## 🛠️ Build Commands

```bash
# Clean build
./mvnw clean compile

# Run tests
./mvnw test

# Full build with tests
./mvnw clean install

# Run application
./mvnw spring-boot:run
```

## 📋 Project Status

✅ **All Issues Fixed:**

- Entity models properly annotated
- Repository interfaces have @Repository annotations
- JWT service consistency resolved
- Unused imports removed
- Redundant configurations removed
- Validation dependencies properly configured

✅ **Build Status:**

- Maven build: SUCCESS
- Compilation: SUCCESS
- Dependencies: All resolved

## 🆘 Still Having Issues?

If you're still seeing problems after following all steps:

1. **Check Java Version**: Ensure you're using Java 17 or higher

   ```bash
   java -version
   ```

2. **Check Maven Version**: Ensure you're using Maven 3.6+

   ```bash
   ./mvnw -version
   ```

3. **Reset Everything**:

   ```bash
   rm -rf target .vscode .idea
   ./mvnw clean install -DskipTests
   ```

4. **Contact Support**: The backend code is correct and builds successfully. Any remaining issues are IDE-specific and can be resolved with the steps above.
