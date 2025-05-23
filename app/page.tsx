import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { CardShowcase } from "@/components/sections/card-showcase"
import { Footer } from "@/components/layout/footer"
import { BlogProfileCard } from "@/components/blog-profile-card"
import { Profile3DCard } from "@/components/profile-3d-card"
import ExpandableCardDemo from "@/components/ui/expandable-card-demo-grid"
// 导入TechSkillsShowcase组件
import { TechSkillsShowcase } from "@/components/tech-skills-showcase"
import MarqueeDemo from "@/components/marquee-demo"
// 导入WavyBackgroundDemo组件
import FadeInSection from "@/components/FadeInSection"


export default function Home() {
  // 名字数组 - 可以包含中文和英文名字
  const names = ["Zina", "王世博"]

  // 职业数组 - 每个职业都有标题和链接
  const professions = [
    { title: "player", link: "/games" },
    { title: "Programmer", link: "#code" },
    { title: "Melophile", link: "/music" },
    { title: "Game DeveloperGame Critic", link: "/games" },
  
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* 3D个人资料卡片 - 使用更高的阈值，确保更多内容可见时才触发 */}
        <FadeInSection threshold={0.2}>
          <section id="profile" className="py-16">
            <div className="container mx-auto px-4">


              <div className="flex justify-center relative">
                {/* 背景装饰元素 */}
                <div className="abso  lute -z-10 -left-20 -bottom-20">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 backdrop-blur-md"></div>
                </div>
                <div className="absolute -z-10 -right-10 -top-10">
                  <div className="w-24 h-24 rounded-full bg-orange-500/30 backdrop-blur-md"></div>
                </div>
                <div className="absolute -z-10 left-40 -top-20">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 256 417"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-10"
                  >
                    <path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
                    <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
                    <path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" />
                    <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z" />
                    <path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z" />
                    <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z" />
                  </svg>
                </div>

                {/* 3D 个人资料卡片 */}
                <Profile3DCard names={names} professions={professions} />
              </div>
            </div>
          </section>
        </FadeInSection>
        
        {/* 评价与反馈跑马灯 - 使用较低的阈值，提前触发动画 */}
        <FadeInSection threshold={0.05}>
          <section id="testimonials" className="py-8">
            <MarqueeDemo />
          </section>
        </FadeInSection>
        
        {/* 技术栈展示 - 添加延迟，让动画更平滑 */}
        <FadeInSection delay={100} threshold={0.15}>
          <section id="code" className="py-16 bg-muted/10">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                {/* 如果这里有标题或其他文本需要动画，也可以包裹 */}
                {/* <FadeInSection><h2>我的技术栈</h2></FadeInSection> */}

              </div>

              <TechSkillsShowcase />
            </div>
          </section>
        </FadeInSection>
        
        {/* 游戏展示 - 添加延迟，确保前面的动画完成 */}
        <FadeInSection delay={200} threshold={0.1}>
          <section id="games" className="py-16 bg-muted/10">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                {/* 如果这里有标题或其他文本需要动画，也可以包裹 */}
                {/* <FadeInSection><h2>我的游戏</h2></FadeInSection> */}
              </div>
              <ExpandableCardDemo />
            </div>
          </section>
        </FadeInSection>
      </main>
      <Footer />
    </div>
  )
}

