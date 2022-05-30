import defaultSettings from '@/settings'

const title = defaultSettings.title || '人资'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
