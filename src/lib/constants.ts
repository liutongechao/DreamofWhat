import logoPeople from '@/images/dream-types/people/people.svg'
import logoAnimal from '@/images/dream-types/animal/animal.svg'
import logoPlant from '@/images/dream-types/plant/plant.svg'
import logoObject from '@/images/dream-types/object/object.svg'
import logoActivity from '@/images/dream-types/activity/activity.svg'
import logoNature from '@/images/dream-types/nature/nature.svg'
import logoSuperNature from '@/images/dream-types/super-nature/super-nature.svg'
import logoBuilding from '@/images/dream-types/building/building.svg'
import logoDailyLife from '@/images/dream-types/daily-life/daily-life.svg'
import logoOther from '@/images/dream-types/other/other.svg'

export const PAGE_SIZE = 10

export interface Dream {
  id: number
  date: string
  title: string
  description: string
  author: {
    name: string
  }
  url: string
}

export interface Article {
  id: number
  date: string
  title: string
  description: string
  author: {
    name: string
  }
  url: string
}

export interface Page {
  href: string
  date: string
  title: string
  description: string
}

export const dreamTypes = [
  {
    id: 1,
    typeName: 'people',
    label: 'People',
    logo: logoPeople,
  },
  {
    id: 2,
    typeName: 'animals',
    label: 'Animals',
    logo: logoAnimal,
  },
  {
    id: 3,
    typeName: 'plants',
    label: 'Plants',
    logo: logoPlant,
  },
  {
    id: 4,
    typeName: 'objects',
    label: 'Objects',
    logo: logoObject,
  },
  {
    id: 5,
    typeName: 'activities',
    label: 'Activities',
    logo: logoActivity,
  },
  {
    id: 6,
    typeName: 'daily-life',
    label: 'Daily Life',
    logo: logoDailyLife,
  },
  {
    id: 7,
    typeName: 'nature',
    label: 'Nature',
    logo: logoNature,
  },
  {
    id: 8,
    typeName: 'super',
    label: 'Supernatural Beings',
    logo: logoSuperNature,
  },
  {
    id: 9,
    typeName: 'buildings',
    label: 'Buildings',
    logo: logoBuilding,
  },
  {
    id: 10,
    typeName: 'others',
    label: 'Others',
    logo: logoOther,
  },
]

export const DREAM_URL_PREFIX = 'dreams/'
export const CATEGORY_URL_PREFIX = 'categories/'
