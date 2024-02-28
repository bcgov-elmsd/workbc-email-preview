import CodeEditor from "./CodeEditor";

const CodeEditorArray = ({
  valueArray,
  setValueArray,
}: {
  valueArray: string[];
  setValueArray: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  // [string, React.Dispatch<React.SetStateAction<string>>
  return (
    <div>
      {valueArray.map((value, index) => (
        <div key={index}>
          <h4>Section {index}</h4>
          <CodeEditor
            value={value}
            setValue={(val: string) => {
              const newValueArray = [...valueArray];
              newValueArray[index] = val;
              setValueArray(newValueArray);
            }}
            addValue={() => {
              const newValueArray = [...valueArray];
              newValueArray.splice(index + 1, 0, "<div>Hello World</div>");
              setValueArray(newValueArray);
            }}
            removeValue={() => {
              const newValueArray = [...valueArray];
              newValueArray.splice(index, 1);
              setValueArray(newValueArray);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CodeEditorArray;
