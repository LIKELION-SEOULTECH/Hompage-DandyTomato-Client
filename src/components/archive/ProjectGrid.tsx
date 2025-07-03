import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projectItems, onClick }: { projectItems: any[], onClick: (id: number) => void }) {
    const rows = 2
    const columns = Math.ceil(projectItems.length / rows) + 1
    return (
        <div
            className="grid h-full grid-rows-2 grid-flow-col-dense gap-16 w-fit overflow-clip pr-100"
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridAutoColumns: 'max-content'
            }}
        >
            {projectItems.map((item, index) => {
                return (
                    <ProjectCard
                        key={item.id}
                        index={index}
                        onClick={onClick}
                    />
                )
            })}
        </div>
    )
}
