import Features from "@/components/home/features"
import FeaturesCars from "@/components/home/featuresCars"
import Hero from "@/components/home/hero"

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturesCars />
      <Features/>
    </div>
  )
}

export default Home