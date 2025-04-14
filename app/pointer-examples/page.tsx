import { BasicPointerExample } from "@/components/examples/basic-pointer-example"
import { CardWithPointer } from "@/components/examples/card-with-pointer"
import { CustomPointerExample } from "@/components/examples/custom-pointer-example"
import { ThreeDCardWithPointer } from "@/components/examples/3d-card-with-pointer"

export default function PointerExamplesPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-6">自定义指针示例</h1>
        <p className="text-muted-foreground mb-8">以下是几种使用自定义指针组件的方式，为您的界面增添交互效果。</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">基本用法</h2>
          <BasicPointerExample />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">自定义指针</h2>
          <CustomPointerExample />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">卡片与指针</h2>
          <CardWithPointer />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3D 卡片与指针</h2>
          <ThreeDCardWithPointer />
        </section>
      </div>
    </div>
  )
}
