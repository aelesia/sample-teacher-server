import { extractStudentEmailsFromNotifications } from '../src/utils/Util'

describe('Util', () => {
  describe('extractStudentEmailsFromNotifications', () => {
    test('extract emails', () => {
      const emails = extractStudentEmailsFromNotifications(
        'Hello students! @studentagnes@gmail.com @studentmiche@gmail.com'
      )
      expect(emails[0]).toEqual('studentagnes@gmail.com')
      expect(emails[1]).toEqual('studentmiche@gmail.com')
    })
    test('only extract valid regex emails #1', () => {
      const emails = extractStudentEmailsFromNotifications('Hello students! @studentagnes@gmail.com @notanemail')
      expect(emails[0]).toEqual('studentagnes@gmail.com')
    })
    test('only extract emails prefixed with @', () => {
      const emails = extractStudentEmailsFromNotifications(
        'Hello students! @studentagnes@gmail.com studentmiche@gmail.com'
      )
      expect(emails[0]).toEqual('studentagnes@gmail.com')
    })
    test('only extract emails seperated by spaces', () => {
      const emails = extractStudentEmailsFromNotifications(
        'Hello students! @studentagnes@gmail.com prefix@studentmiche@gmail.com'
      )
      expect(emails[0]).toEqual('studentagnes@gmail.com')
    })
    test('no emails', () => {
      const emails = extractStudentEmailsFromNotifications('')
      expect(emails).toEqual([])
    })
  })
})
