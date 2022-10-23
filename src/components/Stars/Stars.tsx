interface Props {
  item: string;
  index: number;
  setRate: React.Dispatch<React.SetStateAction<string[]>>;
  rate: string[];
}

const Stars: React.FC<Props> = ({ item, setRate, index, rate }) => {
  const addRateHandler = () => {
    let howMany = index + 1;
    let filledStar = "⭐︎";
    let filledArr = [];
    for (let i = 0; i < howMany; i++) {
      filledArr.push(filledStar);
    }
    if (filledArr.length < 5) {
      let emptyStar = "☆";
      let missing = 5 - filledArr.length;
      for (let i = 0; i < missing; i++) {
        filledArr.push(emptyStar);
      }
    }
    setRate(filledArr);
  };

  return <span onClick={addRateHandler}>{item}</span>;
};

export default Stars;
