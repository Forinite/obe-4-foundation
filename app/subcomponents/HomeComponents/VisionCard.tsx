//app/subcomponents/HomeComponents/VisionCard.tsx

const VisionCard: React.FC = () => {
    return (
        <div className="bg-background/50 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-6 relative overflow-hidden cursor-pointer" style={{ transform: 'none' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-cyan-400/10 rounded-lg" style={{ transform: 'none', opacity: 0.3 }}></div>
            <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-400 pr-8" style={{ transform: 'none', letterSpacing: '0em' }}>
                    Our Vision
                </h2>
                <div style={{ opacity: 1, transform: 'none' }}>
                    <p className="text-foreground/80 mb-4">To ensure that every home in Africa has basic knowledge of life-saving skills.</p>
                    <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Saving Lives Daily</span>
                    </div>
                </div>
                <ul className="text-sm text-foreground/80 space-y-1 list-disc pt-2 ">
                    <li>Zero preventable deaths in rural communities</li>
                    <li> 100% vaccination coverage in target areas</li>
                    <li>Community-owned healthcare initiatives.</li>
                    <li>Intergration with traditional healing practices</li>
                </ul>
            </div>
        </div>
    );
};

export default VisionCard;