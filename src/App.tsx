import { useEffect, useState } from "react";

const App = () => {
  const [unit, setUnit] = useState("%");
  const [inputValue, setInputValue] = useState("0");
  const [inputHover, setInputHover] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [validValue, setValidValue] = useState("0");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle set valid value when input value is greater than 100 and unit is %
    if (
      Number(e.target.value) > 100 &&
      Number(inputValue) <= 100 &&
      unit === "%"
    ) {
      setValidValue(inputValue);
    }

    e.target.value = e.target.value.replace(/,/g, ".");
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (Number(inputValue) > 100 && unit === "%") {
      setInputValue("100");
    }
  }, [unit]);

  return (
    <div className="w-screen h-screen bg-[#303030] flex items-center justify-center text-neutral-100">
      <div className="w-[280px] bg-[#151515] p-4">
        <div className="flex justify-between mb-4 h-9 items-center">
          <span className="text-[12px] text-[#AAAAAA]">Unit</span>
          <div className="flex justify-between w-[140px] bg-[#212121] rounded-[8px] p-0.5 box-border h-full">
            {["%", "px"].map((item) => (
              <button
                key={item}
                onClick={() => setUnit(item)}
                className={`w-[67px] cursor-pointer h-full rounded-[6px] text-sm font-medium transition-all
            ${
              unit === item
                ? "bg-[#3d3d3d] text-white"
                : "text-gray-400 hover:text-white"
            }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between h-9 items-center">
          <span className="text-[12px] text-[#AAAAAA]">Value</span>
          <div
            className={`inline-flex items-center justify-between rounded-[8px] overflow-hidden transition-all bg-[#212121] w-[140px] h-full  focus-within:outline focus-within:outline-[#3C67FF] ${
              inputHover && !inputFocus ? "bg-[#3b3b3b]!" : ""
            } ${inputFocus ? "bg-[#212121]" : ""} `}
          >
            <button
              className={`cursor-pointer h-full text-white hover:bg-[#3a3a3a] transition w-9 ${
                Number(inputValue) <= 0 && unit === "%"
                  ? "hover:bg-[#212121] cursor-default!"
                  : ""
              }`}
              onClick={() => {
                setInputValue(Number(inputValue) - 1 + "");
              }}
              disabled={Number(inputValue) <= 0 && unit === "%"}
            >
              −
            </button>
            <input
              type="text"
              className="w-[68px] text-center bg-transparent text-white outline-none border-none hover:bg-[#3b3b3b] transition focus:bg-[#212121] text-[12px]"
              value={inputValue}
              onChange={handleInputChange}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onFocus={() => {
                setInputFocus(true);
              }}
              onBlur={() => {
                setInputFocus(false);
                if (!inputValue) {
                  setInputValue("0");
                }
                if (Number(inputValue) > 100 && unit === "%") {
                  setInputValue(validValue);
                }
              }}
            />
            <button
              className={`cursor-pointer h-full text-white hover:bg-[#3a3a3a] transition w-9 ${
                Number(inputValue) >= 100 && unit === "%"
                  ? "hover:bg-[#212121] cursor-default!"
                  : ""
              }`}
              onClick={() => {
                setInputValue(Number(inputValue) + 1 + "");
              }}
              disabled={Number(inputValue) >= 100 && unit === "%"}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
