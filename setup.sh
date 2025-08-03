#!/bin/bash

# GigGrid Setup Script
echo "🚀 Setting up GigGrid React Native project..."

# Install Node dependencies
echo "📦 Installing dependencies..."
npm install

# Setup git submodules for testing frameworks
echo "🔧 Setting up testing framework submodules..."
echo "Note: These repos need to exist for submodules to work"
echo "Creating placeholder submodule directories..."

mkdir -p submodules
cd submodules

# Create placeholder frameworks (replace with actual repos when available)
mkdir -p appium-framework
mkdir -p playwright-framework

# Create basic package.json for each framework
cat > appium-framework/package.json << 'EOF'
{
  "name": "universal-appium2-framework",
  "version": "1.0.0",
  "scripts": {
    "test:ios": "echo 'Appium iOS tests would run here'",
    "test:android": "echo 'Appium Android tests would run here'"
  }
}
EOF

cat > playwright-framework/package.json << 'EOF'
{
  "name": "universal-playwright-framework",
  "version": "1.0.0",
  "scripts": {
    "test": "echo 'Playwright web tests would run here'"
  }
}
EOF

cd ..

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "🎯 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Base framework setup"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your Uizard screenshot to reference/welcome-screen/screenshot/full.png"
echo "2. Add any assets to reference/welcome-screen/assets/"
echo "3. Commit and push to trigger the automated workflow"
echo ""
echo "To start development:"
echo "  npm run web    # Start Expo web"
echo "  npm run ios    # Start Expo iOS"
echo "  npm run android # Start Expo Android"
