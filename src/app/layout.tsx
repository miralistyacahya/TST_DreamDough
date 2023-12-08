import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import Nav from '@/components/nav'
import { NAV_PUBLIC } from '@/common/constants/navconstant'
import Footer from '@/components/footer'
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: 'DreamDough',
  description: 'Virtual Personalized Cake Design',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className='flex flex-col min-h-screen'>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
						<main className="relative overflow-hidden flex-1 min-h-screen" style={{ background: 'linear-gradient(to right, rgba(156, 39, 176, 0.2), rgba(33, 150, 243, 0.1))'}}>
							<ToastContainer />
							{children}
						</main>
            		<Footer />
				</Providers>
			</body>
		</html>
	);
}