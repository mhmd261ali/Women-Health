import { useParams } from "react-router-dom";
import BlogListing from "../components/BlogListing";
import BlogDetail from "../components/BlogDetail";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const { slug } = useParams();

  return (
    <div
      className="antialiased"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <Navbar />
      <main className="pt-16">
        {slug ? <BlogDetail slug={slug} /> : <BlogListing />}
      </main>
      <Footer />
    </div>
  );
}
