import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'CodeLab LMS',description:'Learning platform for Scratch, Python and JavaScript'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="de"><body>{children}</body></html>}
