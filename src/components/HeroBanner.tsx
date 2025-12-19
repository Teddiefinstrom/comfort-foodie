import React from "react";

type HeroProps = {
    background: string;
    height?: string;
    children: React.ReactNode;
}

const HeroBanner: React.FC<HeroProps> = React.memo(({ background, height = "70vh", children }) => {
    return (
        <div
        className="global-hero"
        style={{
          backgroundImage: `url(${background})`,
          height,
        }}
      >
        <div className="global-hero-content">
          {children}
        </div>
      </div>
    );
});

export default HeroBanner;