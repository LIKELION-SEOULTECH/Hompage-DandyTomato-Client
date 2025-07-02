export type Question = {
    text: string
    type: 'common' | 'part'
}

export type PartData = {
    name: string
    description: string
    questions: Question[]
}

export const commonQuestions: Question[] = [
    {
        text: '다른 IT 동아리가 아닌 ‘멋쟁이사자처럼’에 지원하게 된 이유가 무엇인가요?',
        type: 'common'
    },
    {
        text: '살면서 가장 깊게 몰입했던 경험과, 해당 경험에서 가장 어려웠던 문제,\n그리고 해결 과정을 새롭게 깨달은 점을 중심으로 설명해 주세요.',
        type: 'common'
    }
]

export const partQuestion: PartData[] = [
    {
        name: '기획 PM',
        description:
            '서비스의 아이디어를 구체화하고,\n어떤 기능이 필요한지 고민하며\n팀원들과 협업해 프로젝트를\n이끌어가는 역할을 해요.',
        questions: [
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            }
        ]
    },
    {
        name: '디자인 DESIGN',
        description:
            '서비스의 아이디어를 구체화하고,\n 어떤 기능이 필요한지 고민하며\n팀원들과 협업해 프로젝트를\n이끌어가는 역할을 해요.',
        questions: [
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            }
        ]
    },
    {
        name: '백엔드 BACK-END',
        description:
            '서비스의 아이디어를 구체화하고,\n어떤 기능이 필요한지 고민하며\n팀원들과 협업해 프로젝트를\n이끌어가는 역할을 해요.',
        questions: [
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            }
        ]
    },
    {
        name: '프론트엔드 FRONT-END',
        description:
            '서비스의 아이디어를 구체화하고,\n어떤 기능이 필요한지 고민하며\n팀원들과 협업해 프로젝트를\n이끌어가는 역할을 해요.',
        questions: [
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            }
        ]
    },
    {
        name: '인공지능 AI',
        description:
            '서비스의 아이디어를 구체화하고,\n어떤 기능이 필요한지 고민하며\n팀원들과 협업해 프로젝트를\n이끌어가는 역할을 해요.',
        questions: [
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            },
            {
                text: '기획자로서 개발자, 디자이너와 협업할 때 가장 중요한 점은 무엇이라고\n생각하시나요?',
                type: 'part'
            }
        ]
    }
]
