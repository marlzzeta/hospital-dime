'use server'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap'

export async function payloadServerFunction(args: {
  name: string
  args: Record<string, unknown>
}) {
  return handleServerFunctions({ ...args, config, importMap })
}
