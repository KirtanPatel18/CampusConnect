
const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};


const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Event Management",
      description: "Create, discover, and join campus events. Never miss out on important activities.",
      color: "bg-teal-600",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.78 9.78 0 01-4-.83L3 21l1.58-3.95A7.97 7.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Discussion Forums",
      description: "Engage in meaningful conversations with peers and faculty members.",
      color: "bg-orange-500",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 006.5 22h11a2.5 2.5 0 002.5-2.5V6H4v13.5zM16 2v4M8 2v4m-4 4h16" />
        </svg>
      ),
      title: "Resource Sharing",
      description: "Access and share study materials, notes, and past papers with your classmates.",
      color: "bg-teal-600",
    },
    {
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 10-4 4h.02a4 4 0 003.98-4zM6 11a4 4 0 100 8h.02A4 4 0 006 11z" />
        </svg>
      ),
      title: "User Profiles",
      description: "Create your academic profile and connect with students sharing similar interests.",
      color: "bg-orange-500",
    },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full -ml-32 -mb-32"></div>

      <div className="container max-w-8xl mx-auto relative px-20">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Everything You Need in One Place</h2>
          <p className="text-gray-600">
            CampusConnect brings together all the tools you need for a successful college experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;