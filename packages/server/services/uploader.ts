import { createWriteStream } from 'fs'
import * as mkdirp from 'mkdirp'
import * as shortid from 'shortid'

const uploadDir = './uploads'

// Ensure upload directory exists
mkdirp.sync(uploadDir)

const storeUpload = ({ stream, filename }): Promise<any> => {
  const id = shortid.generate()
  const path = `${this.uploadDir}/${id}-${filename}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path }))
      .on('error', reject)
  )
}

export const upload = async (uploadInput) => {
  const { stream, filename, mimetype, encoding } = await uploadInput
  const { id, path } = await storeUpload({ stream, filename })

  return { id, filename, mimetype, encoding, path }
}
