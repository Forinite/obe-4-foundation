//app/subcomponents/FooterComponents/ProgramLinks.tsx

const SubscribeForm: React.FC = () => {
    return (
        <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                    <h3 className="font-semibold text-foreground mb-2">Stay Informed About Our Mission</h3>
                    <p className="text-foreground/70 text-sm">
                        Subscribe to receive updates on our healthcare programs, impact stories, and volunteer opportunities.
                    </p>
                </div>
                <div className="flex flex-wrap space-x-3 max-w-md w-full md:w-auto ">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 my-2 px-4 py-2 bg-accent/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all duration-200 text-sm"
                    />
                    <button className="my-2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscribeForm;