import { BookOpen, MessageSquare, Users  , ChevronRight} from "react-feather";

export const WorkSection = () => {
  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Get Started in Three Simple Steps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            CampusConnect makes it easy to get connected with your campus
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Your Profile",
              description:
                "Sign up and create your academic profile with your interests and courses.",
              icon: <Users className="h-8 w-8 text-white" />,
              color: "bg-teal-600",
            },
            {
              step: "02",
              title: "Explore & Connect",
              description:
                "Discover events, resources, and connect with students who share your interests.",
              icon: <BookOpen className="h-8 w-8 text-white" />,
              color: "bg-orange-500",
            },
            {
              step: "03",
              title: "Participate & Contribute",
              description:
                "Join discussions, attend events, and share your own resources with the community.",
              icon: <MessageSquare className="h-8 w-8 text-white" />,
              color: "bg-teal-600",
            },
          ].map((step, index) => (
            <div key={index} className="relative">
              {index < 2 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-gray-400">
                    <ChevronRight className="h-8 w-8" />
                  </div>
                </div>
              )}
              <div className="bg-white rounded-xl p-8 shadow-lg relative z-10 h-full hover:shadow-xl transition-shadow duration-300">
                <div
                  className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 -mt-12 shadow-lg mx-auto`}
                >
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4 text-4xl font-bold text-gray-100">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
