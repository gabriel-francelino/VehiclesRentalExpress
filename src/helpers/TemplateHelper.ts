import fs from 'fs'

export const createTemplate = (path: fs.PathOrFileDescriptor) => {
  const htmlFile = fs.readFileSync(path, 'utf-8')
  return htmlFile
}
