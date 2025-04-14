"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pointer } from "@/components/ui/pointer"
import { Github, Twitter, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ProfileCardProps {
  name: string
  title: string
  bio: string
  avatarUrl: string
  avatarFallback: string
  socialLinks?: {
    github?: string
    twitter?: string
    email?: string
    website?: string
  }
  tags?: string[]
}

export function BlogProfileCard({
  name,
  title,
  bio,
  avatarUrl,
  avatarFallback,
  socialLinks,
  tags = [],
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full max-w-4xl mx-auto mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
        <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20" />
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-6 p-6 pt-0 items-start">
            <div className="relative -mt-10 flex-shrink-0">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-muted-foreground">{title}</p>
              </div>

              <p className="text-sm text-foreground/80">{bio}</p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-row md:flex-col gap-2 self-start md:self-end">
              {socialLinks?.github && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              )}

              {socialLinks?.twitter && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
              )}

              {socialLinks?.email && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`mailto:${socialLinks.email}`}>
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
              )}

              {socialLinks?.website && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href={socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-5 w-5" />
                    <span className="sr-only">Website</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 添加自定义指针效果 */}
      <Pointer>
        <div className="h-8 w-8 rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
      </Pointer>
    </div>
  )
}
