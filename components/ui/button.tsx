import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[17px] font-semibold tracking-[-0.022em] transition-all ios-spring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ember-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-walnut-shadow aria-invalid:ring-destructive/20 aria-invalid:border-destructive active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          'rounded-full bg-bark-brown text-warm-cream shadow-[inset_0_1px_0_rgba(255,237,215,0.12)] hover:bg-bark-brown/90',
        destructive:
          'rounded-full bg-ember-accent text-warm-cream hover:bg-ember-accent/90 focus-visible:ring-ember-accent/20',
        outline:
          'rounded-full border border-warm-cream/20 bg-warm-cream/5 text-warm-cream backdrop-blur-xl hover:bg-warm-cream/10',
        secondary:
          'rounded-full bg-cork-border text-warm-cream hover:bg-cork-border/80',
        ghost:
          'rounded-full text-warm-cream hover:bg-warm-cream/8',
        link: 'rounded-full text-ember-accent underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 min-h-11 px-5 has-[>svg]:px-4',
        sm: 'h-9 min-h-9 gap-1.5 px-4 text-[15px] has-[>svg]:px-3',
        lg: 'h-12 min-h-12 px-7 text-[17px] has-[>svg]:px-5',
        icon: 'size-11 rounded-full',
        'icon-sm': 'size-9 rounded-full',
        'icon-lg': 'size-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
