import { Regex } from '@aelesia/commons'

export function testUtil(): string {
  return 'test'
}

export function extractStudentEmailsFromNotifications(notification: string): string[] {
  return notification.split(' ').reduce<string[]>((prev, word) => {
    if (word.startsWith('@')) {
      const possibleEmail = word.substring(1)
      if (Regex.is.email(possibleEmail)) {
        return [...prev, word.substring(1)]
      }
    }
    return prev
  }, [])
}
