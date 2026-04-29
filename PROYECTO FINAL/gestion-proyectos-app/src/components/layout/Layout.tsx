import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout(){
    return(
       <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar/>
        <main></main>
        <Footer/>
       </div> 
    );
}