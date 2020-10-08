/**
 * There is no good way to detect a duplicate entry error other than through the string message
 * This wrapper exists as both MySQL and PostgreSQL return different error messages
 */
export function isDuplicateEntryError(err: Error): boolean {
  if (
    (err.name === 'QueryFailedError' && err.message.includes('duplicate key value violates unique constraint')) ||
    err.message.includes('ER_DUP_ENTRY')
  ) {
    return true
  }
  return false
}
