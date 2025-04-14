import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Zap, Shield, RefreshCw } from "lucide-react"

const features = [
  {
    icon: <Layers className="h-8 w-8 text-primary" />,
    title: "组件化设计",
    description: "使用模块化组件快速构建界面，提高开发效率和代码复用性。",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "高性能",
    description: "优化的性能和加载速度，提供流畅的用户体验。",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "安全可靠",
    description: "内置安全措施，保护您的应用和用户数据。",
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "响应式设计",
    description: "自适应各种设备尺寸，提供一致的用户体验。",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">核心功能</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我们提供一系列强大的功能，帮助您构建现代化的 Web 应用程序。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-border">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
