import { Inter } from 'next/font/google'
import './globals.css'
import NavMenu from './NavMenu'
import AuthProvider from './AuthProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <NavMenu />
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  )
}
