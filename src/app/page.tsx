// app/about/page.tsx
import React from "react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import CandidateCard from "@/components/CandidateCard";
import FlipCard from "@/components/FlipCard";

const facultyMembers = [
  {
    id: "f1",
    name: "Dr. John Doe",
    category: "Faculty Advisor",
    blurb: "CS Department",
    description: "20+ years of experience in Computer Science and Software Engineering",
    color: "bg-purple-600 border-4 border-orange-500",
    accent: "outline-purple-800",
  },
  {
    id: "f2",
    name: "Dr. Jane Lee",
    category: "Faculty Co-Advisor",
    blurb: "AI & ML Expert",
    description: "Guiding research and innovation in AI/ML for the club.",
    color: "bg-purple-700 border-4 border-orange-500",
    accent: "outline-purple-900",
  },
];

const leadership = [
  {
    id: "l1",
    name: "Samir Patel",
    category: "Chairperson",
    blurb: "Vision & Strategy",
    description: "Steers the club's direction and growth.",
    color: "bg-orange-500 border-4 border-white",
    accent: "outline-orange-700",
  },
  {
    id: "l2",
    name: "Priya Sharma",
    category: "Vice Chairperson",
    blurb: "Operations & Events",
    description: "Manages club operations and event execution.",
    color: "bg-orange-400 border-4 border-white",
    accent: "outline-orange-600",
  },
];

const leads = [
  {
    id: "lead1",
    name: "Amit Verma",
    category: "Dev Team Lead",
    blurb: "Full Stack Dev",
    description: "Heads the development team, building club projects.",
    color: "bg-blue-600 border-2 border-orange-500",
    accent: "outline-blue-800",
  },
  {
    id: "lead2",
    name: "Riya Gupta",
    category: "Design Team Lead",
    blurb: "UI/UX Designer",
    description: "Leads the design team for all club branding.",
    color: "bg-pink-600 border-2 border-orange-500",
    accent: "outline-pink-800",
  },
  {
    id: "lead3",
    name: "Kabir Singh",
    category: "AI/ML Lead",
    blurb: "ML Engineer",
    description: "Heads AI/ML projects and workshops.",
    color: "bg-green-600 border-2 border-orange-500",
    accent: "outline-green-800",
  },
  // you can add more leads below...
];

const directors = [
  {
    id: "dir1",
    name: "Megha Joshi",
    category: "Director - Outreach",
    blurb: "Community & PR",
    description: "Connects the club with industry and campus partners.",
    color: "bg-yellow-500 border border-orange-500",
    accent: "outline-yellow-700",
  },
  {
    id: "dir2",
    name: "Rahul Mehta",
    category: "Director - Events",
    blurb: "Event Planner",
    description: "Organizes and manages all club events.",
    color: "bg-red-500 border border-orange-500",
    accent: "outline-red-700",
  },
];

const teams = [
  {
    name: "Development Team",
    description: "Building innovative solutions and applications.",
    icon: "💻",
  },
  {
    name: "Design Team",
    description: "Creating stunning user interfaces and experiences.",
    icon: "🎨",
  },
  {
    name: "AI/ML Team",
    description: "Research and projects in artificial intelligence and machine learning.",
    icon: "🤖",
  },
  {
    name: "Outreach Team",
    description: "Connecting with industry and campus partners.",
    icon: "🌐",
  },
  {
    name: "Events Team",
    description: "Planning and executing club events.",
    icon: "🎤",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden overflow-y-auto bg-black">
      {/* TECH GRID + SUBTLE GRADIENT OVERLAY (keeps background black but adds texture) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ backgroundColor: "#000" }}
      >
        {/* subtle shimmer gradient & svg circuit/grid overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#000000" stopOpacity="1" />
                <stop offset="1" stopColor="#050505" stopOpacity="1" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
            {/* grid lines */}
            <g stroke="#111827" strokeOpacity="0.06" strokeWidth="1">
              {Array.from({ length: 30 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={(i * 1440) / 30}
                  y1="0"
                  x2={(i * 1440) / 30}
                  y2="800"
                />
              ))}
              {Array.from({ length: 20 }).map((_, j) => (
                <line
                  key={`h-${j}`}
                  x1="0"
                  y1={(j * 800) / 20}
                  x2="1440"
                  y2={(j * 800) / 20}
                />
              ))}
            </g>
            {/* a very subtle corner circuit-like path */}
            <path
              d="M40 720 C200 640, 380 640, 540 720"
              stroke="#f97316"
              strokeOpacity="0.03"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <ScrollAnimationWrapper>
        <header className="pt-12 pb-8 px-6 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-orange-500 leading-tight drop-shadow-lg">
                Coding Ninjas
              </h1>
              <p className="mt-3 text-lg md:text-xl text-gray-300 max-w-2xl">
                A community of passionate developers, designers and ML engineers — building,
                learning and shipping high impact projects on campus and beyond.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href="#join"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors text-black font-semibold shadow-md"
                >
                  Join the Club
                </a>
                <a
                  href="#teams"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/10 hover:border-orange-400 transition-colors text-white/90"
                >
                  View Teams
                </a>
              </div>
            </div>

            {/* Hero micro-card with code-ish lines */}
            <div className="hidden md:block bg-[#061221] border border-white/6 p-4 rounded-xl shadow-lg w-96">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-green-400 font-mono">node v18.16.0</span>
                <span className="text-xs text-gray-400">live • campus</span>
              </div>
              <pre className="language-none text-sm font-mono text-gray-300 bg-transparent m-0 p-0 overflow-auto">
{`// Hack together, ship fast
const club = new CodingNinjas();
club.onboard({curiosity:true, hustle:true});`}
              </pre>
            </div>
          </div>
        </header>
      </ScrollAnimationWrapper>

      {/* Faculty Section */}
      <ScrollAnimationWrapper direction="left">
        <section id="faculty" className="py-10 px-4 relative z-10">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">Faculty Advisors</h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((member, index) => (
              // Faculty highlighted wrapper — professional ring + subtle glow
              <div
                key={member.id}
                className="relative p-1 rounded-2xl"
                aria-hidden={false}
              >
                <div
                  className="rounded-2xl p-1"
                  style={{
                    boxShadow:
                      "0 8px 30px rgba(249,115,22,0.06), inset 0 1px 0 rgba(255,255,255,0.02)",
                    borderRadius: 18,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(249,115,22,0.02))",
                  }}
                >
                  <div className="rounded-2xl ring-1 ring-orange-500/30 hover:ring-orange-400/60 transition-shadow duration-300">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-black/60 to-black/30">
                      <CandidateCard speaker={member} index={index} />
                    </div>
                  </div>
                </div>

                {/* faculty ribbon label (small) */}
                <span className="absolute -top-3 left-4 bg-orange-500 text-black text-xs px-2 py-1 rounded-md font-semibold shadow-sm">
                  Faculty
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Chair & Vice Chair Section */}
      <ScrollAnimationWrapper direction="right">
        <section id="leadership" className="py-10 px-4 bg-black/40">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">Chair & Vice Chair</h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, index) => (
              <div key={leader.id} className="transform hover:scale-105 transition-transform duration-300 shadow-xl rounded-2xl p-1">
                <CandidateCard speaker={leader} index={index} />
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Team Leads */}
      <ScrollAnimationWrapper direction="up">
        <section id="leads" className="py-10 px-4">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">Team Leads</h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leads.map((lead, index) => (
              <div key={lead.id} className="transform hover:scale-105 transition-transform duration-300 rounded-xl p-1">
                <CandidateCard speaker={lead} index={index} />
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Directors */}
      <ScrollAnimationWrapper direction="left">
        <section id="directors" className="py-10 px-4">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">Directors</h2>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {directors.map((director, index) => (
              <div key={director.id} className="transform hover:scale-105 transition-transform duration-300 rounded-xl p-1">
                <CandidateCard speaker={director} index={index} />
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* Ninja Performer of the Month */}
      <ScrollAnimationWrapper direction="up">
        <section id="ninja" className="py-10 px-4 bg-black/40">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">Ninja Performer of the Month</h2>

          <div className="max-w-lg mx-auto transform hover:scale-110 transition-transform duration-300 shadow-2xl rounded-2xl p-1">
            <CandidateCard
              speaker={{
                id: "nom1",
                name: "Alex Johnson",
                category: "Outstanding Performer",
                blurb: "Full Stack Developer",
                description:
                  "Contributed significantly to multiple projects and mentored junior members",
                color: "bg-yellow-500 border-4 border-orange-500",
                accent: "outline-yellow-700",
              }}
              index={0}
            />
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* CN Teams with Flip Cards */}
      <ScrollAnimationWrapper>
        <section id="teams" className="py-10 px-4">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-8">CN Teams</h2>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, idx) => (
              <div
                key={team.name}
                className="transform hover:scale-105 transition-transform duration-300 rounded-xl p-1"
              >
                <FlipCard teamName={team.name} description={team.description} icon={team.icon} />
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimationWrapper>

      {/* micro-animations / scroll hint */}
      <div className="fixed bottom-4 right-4 z-50 text-orange-400 text-xs bg-black/80 px-3 py-1 rounded-full shadow-lg border border-orange-500/30">
        <span className="animate-pulse">Scroll for more</span>
      </div>
    </div>
  );
}
