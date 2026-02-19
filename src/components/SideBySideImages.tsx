import clsx from 'clsx'
import Image, { type StaticImageData } from 'next/image'

type ImageSource = StaticImageData | string

interface SideBySideImagesProps {
  leftImage: ImageSource
  leftAlt: string
  rightImage: ImageSource
  rightAlt: string
  className?: string
}

export function SideBySideImages({
  leftImage,
  leftAlt,
  rightImage,
  rightAlt,
  className,
}: SideBySideImagesProps) {
  return (
    <div className={clsx('my-8 grid grid-cols-1 gap-4 md:grid-cols-2', className)}>
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={leftImage}
            alt={leftAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>

      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={rightImage}
            alt={rightAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
    </div>
  )
}
