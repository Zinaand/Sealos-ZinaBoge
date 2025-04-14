import ThreeDCardDemo from "@/components/ui/3d-card-demo"
import { ProductCard3D } from "@/components/examples/product-card-3d"
import { BlogCard3D } from "@/components/examples/blog-card-3d"

export default function ThreeDCardsPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">3D 卡片展示</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
        <ThreeDCardDemo />
        <ProductCard3D />
        <BlogCard3D />
      </div>
    </div>
  )
}
