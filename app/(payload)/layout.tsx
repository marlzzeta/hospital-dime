import React from 'react'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'
import { payloadServerFunction } from './admin/server-actions'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      serverFunction={payloadServerFunction as any}
    >
      {children}
    </RootLayout>
  )
}
