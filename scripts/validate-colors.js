#!/usr/bin/env node

/**
 * Color Validation Script
 * 
 * This script scans the codebase for non-brand color usage and reports violations.
 * Run with: node scripts/validate-colors.js
 */

const fs = require('fs');
const path = require('path');

// Forbidden color patterns
const FORBIDDEN_PATTERNS = [
  /bg-blue-[0-9]+/g,
  /bg-purple-[0-9]+/g,
  /bg-green-[0-9]+/g,
  /bg-red-[0-9]+/g,
  /bg-yellow-[0-9]+/g,
  /bg-indigo-[0-9]+/g,
  /bg-pink-[0-9]+/g,
  /bg-teal-[0-9]+/g,
  /bg-cyan-[0-9]+/g,
  /text-blue-[0-9]+/g,
  /text-purple-[0-9]+/g,
  /text-green-[0-9]+/g,
  /text-red-[0-9]+/g,
  /text-yellow-[0-9]+/g,
  /text-indigo-[0-9]+/g,
  /text-pink-[0-9]+/g,
  /text-teal-[0-9]+/g,
  /text-cyan-[0-9]+/g,
  /bg-gradient-to-[a-z]+/g,
  /from-[a-z]+-[0-9]+/g,
  /to-[a-z]+-[0-9]+/g,
  /via-[a-z]+-[0-9]+/g,
  /shadow-(sm|md|lg|xl|2xl)/g,
  /drop-shadow-(sm|md|lg|xl|2xl)/g,
];

// Directories to scan
const SCAN_DIRECTORIES = [
  'app',
  'components',
  'lib',
];

// File extensions to check
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, index) => {
    // Look for className attributes
    const classNameMatch = line.match(/className\s*=\s*["'`]([^"'`]+)["'`]/);
    if (classNameMatch) {
      const className = classNameMatch[1];
      
      FORBIDDEN_PATTERNS.forEach(pattern => {
        const matches = className.match(pattern);
        if (matches) {
          violations.push({
            line: index + 1,
            content: line.trim(),
            violations: matches,
          });
        }
      });
    }
  });

  return violations;
}

function scanDirectory(dirPath) {
  const results = [];
  
  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    items.forEach(item => {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and .next directories
        if (!item.startsWith('.') && item !== 'node_modules') {
          walkDir(itemPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (FILE_EXTENSIONS.includes(ext)) {
          const violations = scanFile(itemPath);
          if (violations.length > 0) {
            results.push({
              file: itemPath,
              violations,
            });
          }
        }
      }
    });
  }
  
  walkDir(dirPath);
  return results;
}

function main() {
  console.log('🎨 Scanning codebase for non-brand color usage...\n');
  
  let totalViolations = 0;
  let totalFiles = 0;
  
  SCAN_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`📁 Scanning ${dir}/`);
      const results = scanDirectory(dir);
      
      if (results.length > 0) {
        totalFiles += results.length;
        
        results.forEach(result => {
          console.log(`\n❌ ${result.file}`);
          result.violations.forEach(violation => {
            console.log(`   Line ${violation.line}: ${violation.content}`);
            console.log(`   Violations: ${violation.violations.join(', ')}`);
            totalViolations += violation.violations.length;
          });
        });
      } else {
        console.log(`   ✅ No violations found`);
      }
    }
  });
  
  console.log('\n' + '='.repeat(60));
  
  if (totalViolations === 0) {
    console.log('🎉 Great! No color violations found.');
    console.log('All components are using the brand color system correctly.');
  } else {
    console.log(`⚠️  Found ${totalViolations} color violations in ${totalFiles} files.`);
    console.log('\n📋 Recommended actions:');
    console.log('1. Replace forbidden colors with brand colors from lib/brand-colors.ts');
    console.log('2. Use SEMANTIC_COLORS for component-specific styling');
    console.log('3. Use BRAND_CLASSES for general styling');
    console.log('4. Remove gradients and shadows for flat design');
    console.log('\n📖 See docs/COLOR_GUIDE.md for detailed guidelines');
  }
  
  console.log('\n🔧 Brand color classes to use:');
  console.log('   bg-brand-orange, bg-brand-blue-gray, bg-brand-beige');
  console.log('   text-brand-orange, text-brand-blue-gray, text-foreground');
  console.log('   SEMANTIC_COLORS.uploadZone.*, BRAND_CLASSES.buttons.*');
  
  // Exit with error code if violations found (useful for CI/CD)
  process.exit(totalViolations > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { scanFile, scanDirectory };
