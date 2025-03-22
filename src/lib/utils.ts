export const create_array_of_zeros = (size: number) => {
  const result = []
  for (let i = 0; i < size; ++i) {
    result.push(0)
  }
  return result
}
