import { useParams } from "react-router-dom";
import BlogListing from "../components/BlogListing";
import BlogDetail from "../components/BlogDetail";
import BlogNavbar from "../components/BlogNavbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const { slug } = useParams();

  return (
    <div>
      <BlogNavbar />
      <main>{slug ? <BlogDetail slug={slug} /> : <BlogListing />}</main>
      <Footer />
    </div>
  );
}
