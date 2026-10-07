import Image from 'next/image'

import whatsappLogo from '@/assets/brand/whatsapp.webp'
import { cn } from '@/lib/utils'

/**
 * The WhatsApp brand mark (from src/assets/images/whatsapp-logo.webp, cropped to the circle), finished
 * with a rim, glow and glass highlight (`.wa-logo` in globals.css).
 * `size` sets the box; font-size follows it so the finish scales. Responsive sizes can be layered on with
 * important utilities in `className` (e.g. `sm:!h-[3.75rem] sm:!w-[3.75rem]`).
 * Decorative: the surrounding link or button always carries the accessible name.
 */
export function WhatsAppLogo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('wa-logo', className)} style={{ width: size, height: size, fontSize: size }}>
      <Image src={whatsappLogo} alt="" width={size} height={size} draggable={false} className="block h-full w-full select-none rounded-full" />
    </span>
  )
}
