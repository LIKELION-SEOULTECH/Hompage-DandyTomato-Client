import { cn } from '@/lib/utils'
import Instagram from '@/assets/icons/links/InstagramIcon.svg'
import Notion from '@/assets/icons/links/NotionIcon.svg'
import Behance from '@/assets/icons/links/BehanceIcon.svg'
import Github from '@/assets/icons/links/GithubIcon.svg'
import Tistory from '@/assets/icons/links/TistoryIcon.svg'
import Youtube from '@/assets/icons/links/YoutubeIcon.svg'
import DefaultLink from '@/assets/icons/links/LinkIcon.svg'

export default function LinkIcon({ link }: { link: string }) {
    try {
        const url = new URL(link)
        const pathname = url.pathname
        const domain = url.hostname
        if (domain.includes('instagram')) {
            return (
                <Icon
                    src={Instagram}
                    alt="Instagram"
                    link={link}
                />
            )
        } else if (domain.includes('notion')) {
            return (
                <Icon
                    src={Notion}
                    alt="Notion"
                    link={link}
                />
            )
        } else if (domain.includes('behance')) {
            return (
                <Icon
                    src={Behance}
                    alt="Behance"
                    link={link}
                />
            )
        } else if (domain.includes('github')) {
            return (
                <Icon
                    src={Github}
                    alt="Github"
                    link={link}
                />
            )
        } else if (domain.includes('tistory')) {
            return (
                <Icon
                    src={Tistory}
                    alt="Tistory"
                    link={link}
                />
            )
        } else if (domain.includes('youtube')) {
            return (
                <Icon
                    src={Youtube}
                    alt="Youtube"
                    link={link}
                />
            )
        } else {
            return (
                <Icon
                    src={DefaultLink}
                    alt="DefaultLink"
                    link={link}
                />
            )
        }
    } catch (error) {
        return (
            <Icon
                src={DefaultLink}
                alt="DefaultLink"
                link={link}
            />
        )
    }
}

const Icon = ({
    src,
    alt,
    className,
    link
}: {
    src: string
    alt: string
    className?: string
    link: string
}) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer">
            <img
                src={src}
                alt={alt}
                className={cn('h-48 w-48', className)}
            />
        </a>
    )
}
