import { BriefcaseIcon, UserIcon } from '@heroicons/react/24/outline'

export const user = {
  isAuthenticated: true,
  name: 'John Doe',
  tel: '+1 234 567 890',
  email: 'email@email.com',
  role: 'Admin',
  signature: `---
  John Doe`,
  companies: [
    {
      id: 1,
      name: 'Company 1',
      role: 'Admin',
      members: 3,
      signed: true,
    },
    {
      id: 2,
      name: 'Company 2',
      role: 'Recruiter',
      members: 1,
      signed: false,
    },
  ],
  calendars: [
    {
      id: 1,
      name: 'Google',
      logo: 'https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png',
      email: 'test@gmail.com',
    },
  ],
  plan: 'Free trial',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
}

export const languages = [
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'French',
    value: 'fr',
  },
  {
    label: 'German',
    value: 'de',
  },
  {
    label: 'Italian',
    value: 'it',
  },
  {
    label: 'Spanish',
    value: 'es',
  },
]

export const days = [
  {
    label: 'Monday',
    value: 'monday',
  },
  {
    label: 'Tuesday',
    value: 'tuesday',
  },
  {
    label: 'Wednesday',
    value: 'wednesday',
  },
  {
    label: 'Thursday',
    value: 'thursday',
  },
  {
    label: 'Friday',
    value: 'friday',
  },
]

export const events = [
  {
    id: 1,
    type: 'candidate',
    description: 'Jhon Doe',
    href: '#',
    icon: UserIcon,
  },
  {
    id: 2,
    type: 'job',
    description: 'Frontend Developer',
    href: '#',
    icon: BriefcaseIcon,
  },
  {
    id: 1,
    type: 'candidate',
    description: 'Jhon Doe',
    href: '#',
    icon: UserIcon,
  },
  {
    id: 2,
    type: 'job',
    description: 'Frontend Developer',
    href: '#',
    icon: BriefcaseIcon,
  },
  {
    id: 1,
    type: 'candidate',
    description: 'Jhon Doe',
    href: '#',
    icon: UserIcon,
  },
  {
    id: 2,
    type: 'job',
    description: 'Frontend Developer',
    href: '#',
    icon: BriefcaseIcon,
  },
]

export const appliesData = [
  {
    id: 1,
    type: 'Applied via carrers site',
    number: 2,
  },
  {
    id: 2,
    type: 'Applied via email',
    number: 1,
  },
  {
    id: 3,
    type: 'Added manually',
    number: 4,
  },
  {
    id: 4,
    type: 'Sourced',
    number: 0,
  },
]

export const CANDIDATE = {
  id: 1,
  name: 'John Doe',
  email: 'email@email.com',
  phone: '+13001234',
  tagSource: {
    tag: [
      {
        id: 1,
        name: 'Senior',
      },
    ],
    source: [
      {
        id: 1,
        name: 'Linkedin',
      },
    ],
  },
}

export const AUDIT_LOGS = [
  {
    id: 1,
    type: 'candidate',
    description: 'Created candidate',
    createdAt: '2021-08-10T00:00:00.000Z',
    author: {
      id: 1,
      name: 'Mr X',
    },
  },
  {
    id: 2,
    type: 'candidate',
    description: 'Created candidate',
    createdAt: '2021-08-10T00:00:00.000Z',
    author: {
      id: 1,
      name: 'Mr X',
    },
  },
  {
    id: 3,
    type: 'candidate',
    description: 'Created candidate',
    createdAt: '2021-08-10T00:00:00.000Z',
    author: {
      id: 1,
      name: 'Mr X',
    },
  },
]
