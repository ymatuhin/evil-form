let isOk = false;

export function login() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isOk) {
        resolve("Ok");
      } else {
        isOk = true;
        reject("Something went wrong, please try again");
      }
    }, 2000);
  });
}
