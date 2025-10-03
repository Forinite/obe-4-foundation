//app/subcomponents/HeroBackground.tsx

const HeroBackground: React.FC = () => {
    return (
        <div className="fixed top-[63px] left-0 right-0 w-full h-[500px] overflow-hidden z-10 pointer-events-none">
            <div className="relative flex w-full h-full items-start justify-center">
                <div className="absolute -top-[1px] z-50 w-full flex justify-center">
                    <div
                        className="w-16 h-2 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 rounded-full shadow-lg border-t border-slate-300"
                        style={{ opacity: 1, transform: 'none' }}
                    ></div>
                    <div
                        className="absolute top-1 h-0.5 bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-200 rounded-full shadow-lg shadow-cyan-300/70 blur-[0.5px]"
                        style={{ width: '1.96744rem', opacity: 0.6 }}
                    ></div>
                </div>
                <div
                    className="absolute right-1/2 top-2 h-[400px] w-[25rem] bg-gradient-conic from-cyan-300/40 via-cyan-400/20 to-transparent [--conic-position:from_65deg_at_center_top]"
                    style={{ backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))', opacity: 0.2, width: '15.0479rem' }}
                >
                    <div className="absolute w-full left-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                    <div className="absolute w-40 h-full left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"></div>
                </div>
                <div
                    className="absolute left-1/2 top-2 h-[400px] w-[25rem] bg-gradient-conic from-transparent via-cyan-400/20 to-cyan-300/40 [--conic-position:from_295deg_at_center_top]"
                    style={{ backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))', opacity: 0.2, width: '15.0479rem' }}
                >
                    <div className="absolute w-40 h-full right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"></div>
                    <div className="absolute w-full right-0 bg-background h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                </div>
                <div
                    className="absolute top-2 z-30 h-60 w-32 bg-gradient-to-b from-cyan-300/30 via-cyan-400/20 to-transparent rounded-full blur-xl"
                    style={{ opacity: 0.3, width: '4.59992rem', transform: 'scaleY(0.57499)' }}
                ></div>
                <div
                    className="absolute top-2 z-40 h-40 w-24 bg-gradient-to-b from-cyan-400/40 via-cyan-300/30 to-transparent rounded-full blur-2xl"
                    style={{ opacity: 0.4, width: '5.98762rem' }}
                ></div>
                <div
                    className="absolute top-20 w-full h-full bg-gradient-to-b from-cyan-400/5 via-cyan-300/8 via-cyan-400/5 to-transparent"
                    style={{ opacity: 0.1 }}
                ></div>
                <div className="absolute top-0 w-full h-full bg-gradient-radial from-cyan-400/5 via-transparent to-transparent"></div>
            </div>
        </div>
    );
};

export default HeroBackground;