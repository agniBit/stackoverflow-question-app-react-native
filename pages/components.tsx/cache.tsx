import { AsyncStorage } from "react-native";
import { Cache } from "react-native-cache";

const cache = new Cache({
  namespace: "myapp",
  policy: {
      maxEntries: 50000,
  },
  backend: AsyncStorage
});


export async function setCache(key: string, value: any) {
  console.log("set cache"+key);
  cache.set(key, value);
}

export async function getCache(key: string) {
  console.log(key);
  return await cache.get(key);
}