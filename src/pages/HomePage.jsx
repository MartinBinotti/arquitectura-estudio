import Hero from "../components/Hero";
import HomeStorySections from "../components/HomeStorySections";
import PostsGridSection from "../components/PostsGridSection";
import { getPosts } from "../data/posts";
import { useLanguage } from "../hooks/useLanguage";
import arquitecturaVideo from "../assets/video/arquitectura-video.mp4";

export default function HomePage() {
  const { language } = useLanguage();
  const posts = getPosts(language);

  return (
    <>
      <Hero videoSources={[{ src: arquitecturaVideo, isHeavy: false }]} />
      <PostsGridSection posts={posts.slice(0, 3)} fullWidth />
      <HomeStorySections />
    </>
  );
}

