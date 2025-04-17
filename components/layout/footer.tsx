import Link from "next/link"
import { Github, Twitter, Instagram, Mail } from "lucide-react"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import HeroHighlightDemo from "@/components/hero-highlightdemo";
export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
       
         
            <HeroHighlightDemo />

          <div className="mt-12">
            <p className="text-sm text-muted-foreground mb-4">ZinaのBlogger 数字游牧人</p>
            <div className="flex justify-center gap-4">
              <Link
                href="https://github.com/Zinaand"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:contact@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
