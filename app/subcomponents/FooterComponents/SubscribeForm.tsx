//app/subcomponents/FooterComponents/ProgramLinks.tsx
'use client'

const SubscribeForm: React.FC = () => {
    return (
        <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col  md:items-center md:justify-between gap-6">
                <div className="max-w-md">
                    <h3 className="font-semibold text-blue-400 mb-2 text-lg">
                        Stay Informed About Our Mission
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Subscribe to receive updates on our healthcare programs, impact stories, and volunteer opportunities.
                    </p>
                </div>

                <form
                    className="flex flex-wrap items-center gap-3 w-full md:w-auto"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400
                       text-sm text-gray-200 placeholder-gray-500 transition-all duration-300"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
                       text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-cyan-400/20 hover:-translate-y-[1px]"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubscribeForm;
