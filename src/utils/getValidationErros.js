export default function getValidationErros(err) {
  const validatinoErrors = {}

  err.inner.forEach((error) => {
    validatinoErrors[error.path] = error.message
  })

  return validatinoErrors
}
