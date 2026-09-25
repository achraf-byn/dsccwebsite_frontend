const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename)
const { translations } = require('../lib/i18n/translations.ts')
const normalize = value => value.replace(/&apos;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim().replace(/\s+/g, ' ')
const has = value => translations[value] || Object.keys(translations).some(key => key.toLowerCase() === value.toLowerCase())
const missing = new Set()
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)])
}
const files = [...walk('components').filter(file => !file.includes('admin')), ...walk('app/(public)')].filter(file => /\.tsx?$/.test(file))
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  function visit(node) {
    let value
    if (ts.isJsxText(node)) value = normalize(node.text)
    if (ts.isStringLiteral(node) && ts.isPropertyAssignment(node.parent) && /^(text|label|title|description|eyebrow|highlightedTitle|role)$/.test(node.parent.name.getText(ast))) value = normalize(node.text)
    if (ts.isStringLiteral(node) && ts.isJsxAttribute(node.parent) && /^(eyebrow|title|description|sectionTitle|secondaryTitle)$/.test(node.parent.name.getText(ast))) value = normalize(node.text)
    if (value && /[a-z]{2}/i.test(value) && !has(value) && !['DSCC', 'DSCC.', 'ENSAO', 'Instagram', 'LinkedIn', 'TikTok', 'English', 'Français', '@clubdscc'].includes(value)) missing.add(value)
    ts.forEachChild(node, visit)
  }
  visit(ast)
}
for (const name of ['announcements', 'events', 'news', 'openlab', 'resources']) {
  for (const item of JSON.parse(fs.readFileSync(`data/${name}.json`, 'utf8'))) {
    for (const field of ['title', 'name', 'description', 'excerpt', 'content', 'category', 'status', 'type']) {
      if (!item[field]) continue
      for (const part of item[field].split(/\n\n+/)) if (!has(normalize(part))) missing.add(normalize(part))
    }
  }
}
console.log('Missing public copy:', [...missing])
if (missing.size) process.exitCode = 1
else console.log(`Translation coverage passed (${Object.keys(translations).length} entries).`)
