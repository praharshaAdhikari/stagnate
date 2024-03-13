import { useEffect, useState } from "react";

const App = (): JSX.Element => {
  const [minutes, setMinutes] = useState<string>("00");
  const [seconds, setSeconds] = useState<string>("00");
  const [timerOn, setTimerOn] = useState<boolean>(false);

  useEffect(() => {
    if (!timerOn) return;
    const timer = setInterval(() => handleTimer(), 1000);
    return () => clearInterval(timer);
  }, [timerOn, seconds, minutes]);

  useEffect(() => {
    if (!timerOn) return;

    const handleInteraction = () => {
      setMinutes("00");
      setSeconds("00");
      setTimerOn(false);
    };

    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("mousemove", handleInteraction);
    document.addEventListener("click", handleInteraction);

    return () => {
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("mousemove", handleInteraction);
      document.removeEventListener("click", handleInteraction);
    };
  }, [timerOn]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (seconds == "00" && minutes == "00") return;
    setTimerOn(true);
  };

  const handleSeconds = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const secondString = e.target.value;
    const secondInt = parseInt(secondString);
    if (secondInt === 0) {
      setSeconds("00");
      return;
    }
    if (!secondInt) return;
    if (parseInt(secondString.substring(1)) < 60) {
      setSeconds(secondString.substring(1));
      return;
    }
    if (secondInt >= 60) {
      setSeconds("0" + secondString.substring(2));
      return;
    }
    if (secondInt >= 10) {
      setSeconds(secondInt.toString());
      return;
    }
    setSeconds("0" + secondInt);
  };

  const handleMinutes = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const minuteString = e.target.value;
    const minuteInt = parseInt(minuteString);
    if (minuteInt === 0) {
      setMinutes("00");
      return;
    }
    if (!minuteInt) return;
    if (parseInt(minuteString.substring(1)) < 60) {
      setMinutes(minuteString.substring(1));
      return;
    }
    if (minuteInt >= 60) {
      setMinutes("0" + minuteString.substring(2));
      return;
    }
    if (minuteInt >= 10) {
      setMinutes(minuteInt.toString());
      return;
    }
    setMinutes("0" + minuteInt);
  };

  const handleTimer = () => {
    if (seconds !== "00") {
      setSeconds((previous) => parseTime(previous));
      return;
    }

    if (minutes !== "00") {
      setSeconds("59");
      setMinutes((previous) => parseTime(previous));
      return;
    }

    setTimerOn(false);
  };

  const parseTime = (value: string): string => {
    const valueInt = parseInt(value) - 1;
    if (valueInt <= 0) {
      return "00";
    }
    if (valueInt >= 10) {
      return valueInt.toString();
    }
    return "0" + valueInt;
  };

  return (
    <div
      className={`bg-stone-900 text-stone-100 font-sans font-medium w-screen h-screen p-8 flex flex-col justify-center items-center gap-12 ${
        timerOn ? `cursor-none` : ``
      }`}
    >
      <div>
        {/* Heading */}
        <p
          className={`text-center text-4xl font-bold gradient pb-1 ${
            timerOn ? `onGradient` : `offGradient`
          }`}
        >
          stagnate.
        </p>
        {/* Subheading */}
        <p className="text-center">do nothing and reset your brain.</p>
      </div>
      {/* Timer */}
      <form
        className="flex flex-col justify-center items-center "
        onSubmit={handleSubmit}
      >
        <div className="flex items-center font-orbitron">
          <input
            type="text"
            id="minutes"
            name="minutes"
            value={minutes}
            onChange={handleMinutes}
            min="0"
            className="appearance-none bg-transparent text-center w-36 text-stone-100 focus:outline-none text-7xl"
            disabled={timerOn}
          />
          <span>min</span>
        </div>
        <div className="flex items-center font-orbitron">
          <input
            type="text"
            id="seconds"
            name="seconds"
            value={seconds}
            onChange={handleSeconds}
            min="0"
            className="appearance-none bg-transparent text-center w-36 text-stone-100 focus:outline-none text-7xl"
            disabled={timerOn}
          />
          <span>sec</span>
        </div>
        {!timerOn && (
          <button
            type="submit"
            className="my-12 px-24 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            start
          </button>
        )}
        {timerOn && (
          <div className="my-12 px-24 py-2 bg-red-500 text-white rounded-md">
            the timer resets if any the site detects any interactions.
          </div>
        )}
      </form>
    </div>
  );
};
export default App;
