"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string; // 允许传递额外的 CSS 类
  threshold?: number; // 可见阈值，0-1之间
  delay?: number; // 动画延迟（毫秒）
  once?: boolean; // 是否只触发一次
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ 
  children, 
  className = '',
  threshold = 0.1,
  delay = 0,
  once = true // 默认只触发一次
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false); // 跟踪是否已经触发过动画

  useEffect(() => {
    const currentRef = domRef.current; // 在 Effect 内部捕获 ref
    if (!currentRef) return; // 确保 ref 存在

    // 如果设置了延迟，先将元素设置为不可见
    if (delay && delay > 0) {
      currentRef.style.transitionDelay = `${delay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当元素进入视口时，设置为可见
          if (entry.isIntersecting) {
            // 如果设置了只触发一次且已经触发过，则不再处理
            if (once && hasAnimated.current) return;
            
            setIsVisible(true);
            hasAnimated.current = true;
            
            // 可选：一旦可见，如果只需触发一次，就停止观察
            if (once) {
              observer.unobserve(currentRef);
            }
          } else if (!once) {
            // 如果允许多次触发，当元素离开视口时，重置状态
            setIsVisible(false);
          }
        });
      },
      {
        threshold, // 元素可见比例达到阈值时触发
        rootMargin: '0px 0px -50px 0px', // 可以提前一点触发，更平滑的体验
      }
    );

    observer.observe(currentRef);

    // 清理函数：组件卸载时断开观察
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, delay, once]); // 依赖项添加可配置选项

  const sectionStyle: React.CSSProperties = {};
  
  return (
    <div
      // 应用基础 fade-in 类和条件 visible 类，以及任何传入的 className
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      ref={domRef}
      style={sectionStyle}
    >
      {children}
    </div>
  );
};

export default FadeInSection; 