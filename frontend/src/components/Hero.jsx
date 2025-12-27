import { Link } from "react-router";
import {
  ArrowRightIcon,
  SparklesIcon,
  ZapIcon,
  CheckIcon,
  ArrowRight,
  VideoIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="badge badge-primary badge-lg">
            <ZapIcon className="size-4" />
            Real-time Collaboration
          </div>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight">
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Code Together,
            </span>
            <br />
            <span className="text-base-content">Learn Together</span>
          </h1>
          <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
            The ultimate platform for collaborative coding interviews and pair
            programming. Connect face-to-face, code in real-time, and ace your
            interviews with
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-2xl font-black tracking-wider">
              {" "}
              confidence
            </span>
            .
          </p>

          {/* FEATURES PILLS */}
          <div className="flex flex-wrap gap-3">
            <div className="badge badge-lg badge-outline">
              <CheckIcon className="size-4 text-success" />
              Live Video Chat
            </div>
            <div className="badge badge-lg badge-outline">
              <CheckIcon className="size-4 text-success" />
              Code Editor
            </div>
            <div className="badge badge-lg badge-outline">
              <CheckIcon className="size-4 text-success" />
              Multi-Language
            </div>
          </div>

          {/* CTA */}

          <div className="flex flex-wrap gap-4">
            <SignInButton mode="modal">
              <button className="group btn btn-primary btn-lg">
                Start Coding Now
                <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform duration-100" />
              </button>
            </SignInButton>
            <button className="btn btn-outline btn-lg">
              <VideoIcon className="size-5" />
              Watch Demo
            </button>
          </div>

          {/* STATS */}

          <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
            <div className="stat">
              <div className="stat-value text-primary">10K+</div>
              <div className="stat-title">Active Users</div>
            </div>
            <div className="stat">
              <div className="stat-value text-secondary">50K+</div>
              <div className="stat-title">Sessions</div>
            </div>
            <div className="stat">
              <div className="stat-value text-accent">99.9%</div>
              <div className="stat-title">Uptime</div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <img
          src="/hero.png"
          alt="CodeCollabe Platform"
          className="w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
};

export default Hero;
