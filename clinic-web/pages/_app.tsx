import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import MainLayout from "./mainLayout";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const guestPages = ['/login'];
  
  const useLayout = !guestPages.includes(router.pathname);


  return useLayout ? (
  <MainLayout>
    <Component {...pageProps} />
  </MainLayout>) : 
  (
    <Component {...pageProps} />
  )
}
