import React from "react";
import NavbarForProblems from "../components/NavbarForProblems.jsx";
import { PROBLEMS } from "../data/problems.js";
import { Binary, ChevronRightIcon, Code2Icon } from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../utils/utils.js";

const ProblemsPage = React.memo(() => {
  const problems = Object.values(PROBLEMS);

  const EasyProblemCount = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;
  const MediumProblemCount = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;
  const HardProblemCount = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  return (
    <div className="min-h-screen bg-base-200">
      <NavbarForProblems />
      {/* main content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="gap-2 mb-8">
          <div className="w-full flex items-center gap-3">
            <Binary className="size-8 text-primary mb-1" />
            <h1 className="text-2xl md:text-4xl font-bold mb-1">
              Practice Problems
            </h1>
          </div>
          <p className="text-base-content/70 text-sm md:text-lg ml-11">
            Sharpen Your Coding Skills
          </p>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {problems.map((problem) => {
            return (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="card bg-base-100 hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Code2Icon className="size-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-xl font-bold">
                              {problem.title}
                            </h2>
                            <span
                              className={`badge ${getDifficultyBadgeClass(
                                problem.difficulty
                              )}`}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-base-content/60">
                            {problem.category}
                          </p>
                        </div>
                      </div>
                      <p className="text-base-content/80 mb-3">
                        {problem.description.text}
                      </p>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center gap-2 text-primary">
                      <span className="font-medium">Solve</span>
                      <ChevronRightIcon className="size-5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* STATS */}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-white">{problems.length}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">
                  {EasyProblemCount}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">
                  {MediumProblemCount}
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{HardProblemCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default ProblemsPage;
