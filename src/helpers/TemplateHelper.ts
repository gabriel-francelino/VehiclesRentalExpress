import fs from 'fs'

export const createTemplate = (caminho: fs.PathOrFileDescriptor) => {
  const htmlFile = fs.readFileSync(caminho, 'utf-8')
  return htmlFile
}
