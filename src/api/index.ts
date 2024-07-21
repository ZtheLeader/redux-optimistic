export function fakeApiMethod(): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Response data');
    }, 3000);
  });
}

export function fakeApiFailure(): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error occurred');
    }, 3000);
  });
}