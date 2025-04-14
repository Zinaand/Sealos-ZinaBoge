"use client"

import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Navbar container
export const Navbar = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80"
          : "bg-transparent",
        className,
      )}
      {...props}
    >
      <motion.div
        className="w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Desktop navigation body
export const NavBody = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("mx-auto hidden h-16 max-w-screen-xl items-center justify-between px-4 md:flex lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Navigation items container
export const NavItems = ({
  items,
  className,
  ...props
}: {
  items: { name: string; link: string }[]
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center gap-6", className)} {...props}>
      {items.map((item, idx) => (
        <Link
          key={`desktop-link-${idx}`}
          href={item.link}
          className="group relative text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </div>
  )
}

// Mobile navigation container
export const MobileNav = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("md:hidden", className)} {...props}>
      {children}
    </div>
  )
}

// Logo component
export const NavbarLogo = ({
  className,
  logoLetter = "A",
  brandName = "Acme",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  logoLetter?: string
  brandName?: string
}) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <Link href="/" className="flex items-center gap-2 group">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white transition-transform duration-300 group-hover:scale-110 dark:bg-white dark:text-neutral-900">
          <span className="font-bold">{logoLetter}</span>
        </div>
        <span className="text-lg font-semibold text-neutral-900 dark:text-white">{brandName}</span>
      </Link>
    </div>
  )
}

// Button component
export const NavbarButton = ({
  variant = "primary",
  className,
  children,
  ...props
}: {
  variant?: "primary" | "secondary"
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95",
        variant === "primary"
          ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Mobile navigation header
export const MobileNavHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex h-16 items-center justify-between px-4", className)} {...props}>
      {children}
    </div>
  )
}

// Mobile navigation toggle button
export const MobileNavToggle = ({
  isOpen,
  onClick,
  className,
  ...props
}: {
  isOpen: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900 active:scale-90 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        className,
      )}
      {...props}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  )
}

// Mobile navigation menu
export const MobileNavMenu = ({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-16 flex flex-col gap-6 border-t border-neutral-200 bg-white p-6 transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-950",
        isOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
