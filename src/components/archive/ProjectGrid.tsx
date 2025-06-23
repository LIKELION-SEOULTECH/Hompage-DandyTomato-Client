import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projectItems }: { projectItems: any[] }) {
    const rows = 2
    const columns = Math.ceil(projectItems.length / rows) + 1
    return (
        <div
            className="absolute top-[280px] left-32 grid gap-16"
            style={{
                gridTemplateColumns: `repeat(${columns}, 500px)`,
                gridTemplateRows: `repeat(${rows}, minmax(286px, 1fr))`,
                gridAutoFlow: 'column dense',

                // height: `100%`
                width: `${columns * 500}px`
            }}>
            {projectItems.map((item, index) => {
                return (
                    <>
                        <ProjectCard
                            key={item.id}
                            index={index}
                        />
                    </>
                )
            })}
        </div>
    )
}
