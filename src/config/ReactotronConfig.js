import Reactotron from 'reactotron-react-native';

const host = '192.168.15.10';

if (__DEV__) {
  const tron = Reactotron.configure({ host })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
