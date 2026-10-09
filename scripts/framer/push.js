const fs = require('fs');
const names = ['Styles','Nav','Hero','Gap','Technology','Residency','Evidence','Mesh','Enterprises','Measurement','Domains','Audit','Faq','Footer'];
for (const t of ['ZTestA.tsx','ZTestB.tsx','ZTestC.tsx','ZTestD.tsx','ZTestE.tsx','ZTestF.tsx','ZTestG.tsx','ZTestH.tsx','ZTestI.tsx']) { const f = await framer.getCodeFile(t); if (f) await f.remove(); }
state.codeFiles = {};
const out = {};
for (const n of names) {
  const fileName = `Intellient${n}.tsx`;
  const code = fs.readFileSync(`framer-dist/${n}.tsx`, 'utf8');
  let file = await framer.getCodeFile(fileName);
  file = file ? await file.setFileContent(code) : await framer.createCodeFile(fileName, code);
  const ex = file.exports.find((e) => e.type === 'component');
  state.codeFiles[n] = ex ? { file: file.id, id: ex.id, insertURL: ex.insertURL, name: ex.name } : null;
  out[n] = ex ? ex.name : 'NO EXPORT';
}
console.log(JSON.stringify(out));
