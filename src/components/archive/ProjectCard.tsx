import React from 'react'

interface ProjectCardProps {
    className?: string
    // Add other props like title, imageUrl, etc. as needed
}

const ProjectCard: React.FC<ProjectCardProps> = ({ className }) => {
    return <div className={`shrink-0 rounded-[15px] bg-white ${className}`} />
}

export default ProjectCard
