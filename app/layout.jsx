import './assets/styles/globals.css';
export const metadata = {
  title: "Property pulse",
  keywords:"rental, property, buy, sell, real estate",
  description: "Find the perfect rental property.",
}
const MainLayout = ({children}) => {
    return ( <html lang="en">
       
    <body>
      <main>{children}</main>
    </body>
    </html> );
}
 
export default MainLayout;