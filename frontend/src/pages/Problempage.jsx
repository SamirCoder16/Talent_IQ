import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import NavbarForProblems from "../components/NavbarForProblems";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditor from "../components/CodeEditor";
import { executeCode } from "../lib/piston.js";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";
const Problempage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript
  );
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  // update problem when param and language changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(currentProblem.starterCode[newLanguage]);
    setOutput(null);
  };
  const handleProblemChange = (newProblemId) =>
    navigate(`/problem/${newProblemId}`);
  const triggerConfetti = () => {
    // confetti effect when all test cases pass
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.5, y: 0.5 },
    });
  };

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/'/g, '"')  // standardize quotes
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const chackIfTestsPassed = (actualOutput, expectedOutput) => {
    console.log("Actual Output:", actualOutput);
    console.log("Expected Output:", expectedOutput);
    const normalizedActualOutput = normalizeOutput(actualOutput);
    const normalizedExpectedOutput = normalizeOutput(expectedOutput);
    return normalizedActualOutput === normalizedExpectedOutput;
  };
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("null");

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // check if code exicuted successfully and passed all test cases
    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = chackIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        toast.success("All test cases passed! 🎉");
        triggerConfetti();
      } else {
        toast.error("test failed! ❌");
      }
    } else {
      toast.error("Code execution failed! ❌");
    }
  };

  return (
    <div className="h-screen w-full bg-base-100 flex flex-col ">
      <NavbarForProblems />

      <div className="flex-1">
        <PanelGroup direction="horizontal" className="">
          <Panel defaultSize={40} minSize={30} className="">
            {/* leeft-panel -> Problem Description */}
            <ProblemDescription
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* right-panel -> Code Editor & output */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={60} minSize={30}>
                {/* Top-Panel -> Code Editor */}
                <CodeEditor
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={40} minSize={30}>
                {/* Bottom-Panel -> Output */}
                <OutputPanel output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default Problempage;
