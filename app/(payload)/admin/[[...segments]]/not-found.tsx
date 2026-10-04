import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import config from '@payload-config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = (props: Args) => NotFoundPage({ config, importMap, ...props })

export default NotFound
