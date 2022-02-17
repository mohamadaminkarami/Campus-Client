import {
  atom,
  selector,
  useRecoilState,
  DefaultValue,
  useResetRecoilState,
} from "recoil";

const tempFahrenheit = atom({
  key: "tempFahrenheit",
  default: selector({ key: "def", get: () => 32 }),
});

const tempCelsius = selector({
  key: "tempCelsius",
  get: ({ get }) => ((get(tempFahrenheit) - 32) * 5) / 9,
  set: ({ set }, newValue) =>
    set(
      tempFahrenheit,
      newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32
    ),
});

function HomePage() {
  const [tempF, setTempF] = useRecoilState(tempFahrenheit);
  const [tempC, setTempC] = useRecoilState(tempCelsius);
  const resetTemp = useResetRecoilState(tempCelsius);

  const addTenCelsius = () => setTempC((old) => old + 10);
  // const addTenFahrenheit = () => setTempF(tempF + 10);
  const reset = () => resetTemp();

  return (
    <div>
      Temp (Celsius): {tempC}
      <br />
      Temp (Fahrenheit): {tempF}
      <br />
      <button onClick={addTenCelsius}>Add 10 Celsius</button>
      <br />
      {/* <button onClick={addTenFahrenheit}>Add 10 Fahrenheit</button> */}
      <br />
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default HomePage;
