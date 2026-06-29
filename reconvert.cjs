const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const targetDir = path.join(srcDir, 'src', 'pages');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Helper to convert filename to PascalCase component name
function toPascalCase(str) {
  return str
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+(.)(\w*)/g, ($1, $2, $3) => $2.toUpperCase() + $3.toLowerCase())
    .replace(/\w/, s => s.toUpperCase());
}

// Helper to convert inline CSS style string to JSX style object
function convertStyle(styleStr) {
  const declarations = styleStr.split(';').map(d => d.trim()).filter(Boolean);
  const obj = {};
  for (const dec of declarations) {
    const colonIdx = dec.indexOf(':');
    if (colonIdx === -1) continue;
    const prop = dec.substring(0, colonIdx).trim();
    const val = dec.substring(colonIdx + 1).trim();
    
    // Convert kebab-case property to camelCase
    const camelProp = prop.replace(/-([a-z])/gi, (g) => g[1].toUpperCase());
    obj[camelProp] = val;
  }
  return `style={${JSON.stringify(obj)}}`;
}

// Main conversion function
function convertHtmlToJsx(htmlContent, componentName) {
  // Extract body content
  let bodyContent = htmlContent;
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    bodyContent = bodyMatch[1];
  }

  // 1. Remove script tags
  bodyContent = bodyContent.replace(/<script\b[\s\S]*?<\/script>/gi, '');

  // 2. Remove HTML comments
  bodyContent = bodyContent.replace(/<!--[\s\S]*?-->/g, '');

  // 3. Wrap <style> tag content in template literals so JSX compiles it
  bodyContent = bodyContent.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (match, attrs, css) => {
    const escapedCss = css.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    return `<style${attrs}>{\`${escapedCss}\`}</style>`;
  });

  // 4. Self-close unclosed tags: img, input, br, hr, link, meta, source, col
  const voidTags = ['img', 'input', 'br', 'hr', 'link', 'meta', 'source', 'col'];
  for (const tag of voidTags) {
    const regex = new RegExp(`<(${tag})\\b([^>]*?)(?<!\\/)>`, 'gi');
    bodyContent = bodyContent.replace(regex, '<$1$2 />');
  }

  // 5. Convert attributes
  bodyContent = bodyContent
    // class=" -> className="
    .replace(/\bclass="/g, 'className="')
    .replace(/\bclass='/g, 'className=\'')
    // for=" -> htmlFor="
    .replace(/\bfor="/g, 'htmlFor="')
    .replace(/\bfor='/g, 'htmlFor=\'')
    // http-equiv -> httpEquiv
    .replace(/\bhttp-equiv=/gi, 'httpEquiv=')
    // onclick -> onClick
    .replace(/\bonclick=/gi, 'onClick=')
    // onload -> onLoad
    .replace(/\bonload=/gi, 'onLoad=')
    // autocomplete -> autoComplete
    .replace(/\bautocomplete=/gi, 'autoComplete=')
    // autofocus -> autoFocus
    .replace(/\bautofocus=/gi, 'autoFocus=')
    // readonly -> readOnly
    .replace(/\breadonly=/gi, 'readOnly=')
    // colspan -> colSpan
    .replace(/\bcolspan=/gi, 'colSpan=')
    // rowspan -> rowSpan
    .replace(/\browspan=/gi, 'rowSpan=')
    // maxlength -> maxLength
    .replace(/\bmaxlength=/gi, 'maxLength=')
    // tabindex -> tabIndex
    .replace(/\btabindex=/gi, 'tabIndex=');

  // Convert unvalued boolean attributes to React syntax
  bodyContent = bodyContent
    .replace(/\bdisabled\b(?!=)/g, 'disabled={true}')
    .replace(/\bchecked\b(?!=)/g, 'defaultChecked={true}')
    .replace(/\breadonly\b(?!=)/g, 'readOnly={true}');

  // Convert value="..." to defaultValue="..." to avoid React controlled input warnings
  bodyContent = bodyContent
    .replace(/\bvalue="([^"]*)"/g, 'defaultValue="$1"')
    .replace(/\bvalue='([^']*)'/g, 'defaultValue=\'$1\'');

  // 6. Convert inline styles
  bodyContent = bodyContent.replace(/\bstyle="([^"]*)"/gi, (match, styleStr) => {
    return convertStyle(styleStr);
  });
  bodyContent = bodyContent.replace(/\bstyle='([^']*)'/gi, (match, styleStr) => {
    return convertStyle(styleStr);
  });

  // 7. Fix asset paths in JSX components
  bodyContent = bodyContent
    .replace(/src=["']assets\/images\/([^"']+)["']/g, 'src="/images/$1"')
    .replace(/src=["']assets\/js\/([^"']+)["']/g, 'src="/js/$1"')
    .replace(/href=["']assets\/css\/([^"']+)["']/g, 'href="/css/$1"')
    .replace(/href=["']assets\/images\/([^"']+)["']/g, 'href="/images/$1"')
    .replace(/\bassets\/images\//g, '/images/')
    .replace(/\bassets\/css\//g, '/css/')
    .replace(/\bassets\/js\//g, '/js/');

  // 8. Convert links from .html to React route paths
  bodyContent = bodyContent.replace(/\bhref="index\.html"/gi, 'href="/"');
  bodyContent = bodyContent.replace(/\bhref='index\.html'/gi, 'href="/"');
  bodyContent = bodyContent.replace(/\bhref="([^"#\s]+)\.html([^"]*)"/gi, 'href="/$1$2"');
  bodyContent = bodyContent.replace(/\bhref='([^'#\s]+)\.html([^']*)'/gi, 'href="/$1$2"');

  // 9. Clean up common entities
  bodyContent = bodyContent.replace(/&nbsp;/g, '{"\\u00a0"}');

  // Wrap in JSX template
  const jsxCode = `const ${componentName} = () => {
  return (
    <>
      ${bodyContent.trim()}
    </>
  );
};

export default ${componentName};
`;

  return jsxCode;
}

// Read directory
const files = fs.readdirSync(srcDir);
const htmlFiles = files.filter(f => f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to convert.`);

htmlFiles.forEach(file => {
  const filePath = path.join(srcDir, file);
  const baseName = path.basename(file, '.html');
  const componentName = toPascalCase(baseName);
  const targetFileName = `${componentName}.jsx`;
  const targetPath = path.join(targetDir, targetFileName);

  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    const jsxContent = convertHtmlToJsx(htmlContent, componentName);
    fs.writeFileSync(targetPath, jsxContent, 'utf-8');
    console.log(`Re-converted ${file} -> src/pages/${targetFileName}`);
  } catch (error) {
    console.error(`Error converting ${file}:`, error);
  }
});

console.log('Re-conversion complete!');
