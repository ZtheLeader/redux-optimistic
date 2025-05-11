export function fakeApiMethod(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Response data');
    }, 3000);
  });
}

export function fakeApiFailure(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Error occurred');
    }, 3000);
  });
}