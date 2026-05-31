import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
})

export interface Profile {
    name: string
    role: string
    bio: string
    photo_url: string | null
    cv_url: string | null
    github: string
    linkedin: string
    email: string
    whatsapp: string
    years_experience: number
    projects_count: number
    skills: { id: number; name: string; percentage: number }[]
}

export interface Project {
    id: number
    title: string
    subtitle: string
    description?: string
    tags: { id: number; name: string }[]
    github_url: string
    live_url: string
    image_url: string | null
    status: string
    featured: boolean
}

export interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt: string
    read_time: number
    created_at: string
    tags: { id: number; name: string }[]
}

export const getProfile = async () => (await api.get('/profile/')).data

export const getProjects = async (featured?: boolean) => {
    const params = featured ? { featured: 'true' } : {}
    const { data } = await api.get('/projects/', { params })
    return (data.results ?? data) as Project[]
}

export const getBlogPosts = async () => {
    const { data } = await api.get('/blog/')
    return (data.results ?? data) as BlogPost[]
}

export const sendContact = async (payload: {
    name: string
    email: string
    subject: string
    message: string
}) => api.post('/contact/', payload)

export const getCVDownloadUrl = () =>
    `${
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
    }/cv/download/`
