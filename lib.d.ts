import type { Transform } from 'stream'
import type { ClientOptions } from '@opensearch-project/opensearch'

export default pinoOpensearch

declare function pinoOpensearch(options?: Options): DestinationStream

export type DestinationStream = Transform & {
  /**
   * when something, that cannot be parsed, is encountered
   */
  on(event: 'unknown', handler: (line: string, error: string) => void): void
  /**
   * when a bulk insert request failed which resulted in logs being dropped
   */
  on(event: 'insertError', handler: (error: Error & { document: Record<string, any> }) => void): void
  /**
   * when a batch of logs was sent successfully
   */
  on(event: 'insert', handler: (stats: Record<string, any>) => void): void
  /**
   * when some other kind of error happened, e.g. connection issues
   */
  on(event: 'error', handler: (error: Error) => void): void
}

export type Options = Pick<ClientOptions, 'node' | 'auth' | 'cloud' | 'Connection' | 'ConnectionPool'> & {
  index?: Index
  type?: string
  opType?: OpType;
  flushBytes?: number | undefined
  flushInterval?: number | undefined
  esVersion?: number | undefined
  ssl?: ClientOptions['ssl'];
}

export type Index = string | `${string | ''}%{DATE}${string | ''}` | ((logTime: string) => string)

export type OpType = 'create' | 'index'