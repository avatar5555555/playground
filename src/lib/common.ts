export const callAll = (...fns) => (...args) =>
  fns.forEach((fn) => fn && fn(...args))

export const callAllAsync = (...fns) => async (...args) => {
  for (const fn of fns) {
    await fn(...args)
  }
}
