import Categories from "@/components/home/Categories"
import Features from "@/components/home/Features"
import FeaturesCars from "@/components/home/FeaturesCars"
import Hero from "@/components/home/Hero"

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturesCars />
      <Features/>
    </div>
  )
}

export default Home