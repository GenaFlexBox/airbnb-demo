import { Nunito } from 'next/font/google';
import Navbar from './components/Navbar/Navbar';
import './globals.css';
import ClientOnly from './components/ClientOnly/ClientOnly';
import ProviderWrapper from './components/Provider/Provider';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvide from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/Modals/RentModal';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({subsets: ['latin']});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ProviderWrapper>
            <ClientOnly>
                <ToasterProvide />
                <RentModal />
                <LoginModal />
                <RegisterModal />
                <Navbar currentUser={currentUser}/>
            </ClientOnly>
            <div className='pb-20 pt-28'>
              {children}
            </div>
        </ProviderWrapper>
      </body>
    </html>
  )
}
