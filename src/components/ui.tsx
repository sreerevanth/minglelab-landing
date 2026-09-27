import type { ReactNode } from 'react'
import BlurText from '@/components/reactbits/BlurText'
import StarBorder from '@/components/reactbits/StarBorder'
import { cn } from '@/lib/utils'
import { useTheme } from '@/theme'

// Every page of the deck fills the viewport; long pages scroll inside themselves.
export const slideClass = 'flex min-h-[100svh] flex-col justify-center pt-28 pb-24 md:pt-32'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10', className)}>{children}</div>
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-paper/20" />
      {children}
    </p>
  )
}

export function SectionHeading({ text, className }: { text: string; className?: string }) {
  return (
    <BlurText
      text={text}
      delay={80}
      animateBy="words"
      direction="bottom"
      className={cn(
        'font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-paper',
        className,
      )}
    />
  )
}

type CtaProps = { href: string; children: ReactNode; size?: 'md' | 'lg'; variant?: 'lime' | 'ink' }

export function CtaButton({ href, children, size = 'md', variant = 'lime' }: CtaProps) {
  const { palette } = useTheme()
  const lime = variant === 'lime'
  return (
    <StarBorder
      as="a"
      href={href}
      color={lime ? palette.paper : palette.lime}
      speed="5s"
      thickness={2}
      backgroundColor={lime ? palette.lime : palette.ink}
      textColor={lime ? palette.onLime : palette.paper}
      borderColor={lime ? palette.lime : palette.paperFaint}
      className={cn(
        'rounded-full! font-semibold tracking-[-0.01em] [&>div:last-child]:rounded-full!',
        size === 'lg'
          ? '[&>div:last-child]:px-8! [&>div:last-child]:py-4! [&>div:last-child]:text-lg!'
          : '[&>div:last-child]:px-5! [&>div:last-child]:py-2.5! [&>div:last-child]:text-sm!',
      )}
    >
      {children}
    </StarBorder>
  )
}
