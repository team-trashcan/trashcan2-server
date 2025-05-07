import { readdir } from 'fs/promises'
import logger from '../logger'

/**
 * Read a directory and its sub directories.
 * @returns array of file paths
 */
export default async function readDirectory(directoryPath: string, aggregateFiles?: string[]): Promise<string[]> {
  const directoryFiles = aggregateFiles ?? []
  try {
    const directoryContents = await readdir(directoryPath, { withFileTypes: true })
    for (const directoryContent of directoryContents) {
      if (directoryContent.isDirectory()) {
        directoryFiles.concat(await readDirectory(`${directoryPath}/${directoryContent.name}`, directoryFiles))
      } else {
        directoryFiles.push(`${directoryPath}/${directoryContent.name}`)
      }
    }
    return directoryFiles
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'path' in error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      throw new Error(
        `Invalid file path supplied to readDirectory: ${(error as NodeJS.ErrnoException).path ?? 'undefined'}`
      )
    }
    logger.error(`Error getting file names: ${JSON.stringify(error)}`)
    throw new Error(`Error getting file names: ${JSON.stringify(error)}`)
  }
}
