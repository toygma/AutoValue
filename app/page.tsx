import Categories from "@/components/home/categories"
import Features from "@/components/home/features"
import FeaturesCars from "@/components/home/featuresCars"
import Hero from "@/components/home/hero"

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