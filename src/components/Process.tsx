import React, { useRef } from 'react';
import { Search, PenTool, Code, CheckCircle, Rocket, HeartHandshake } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Process.css';

const steps = [
  {
    icon: <Search className="w-8 h-8" style={{ color: 'var(--accent-2)' }} />,
    title: "Discovery & Strategy",
    description: "We start by diving deep into your business goals, target audience, and requirements to build a solid foundation."
  },
  {
    icon: <PenTool className="w-8 h-8" style={{ color: 'var(--accent-1)' }} />,
    title: "Design & Prototyping",
    description: "We create stunning, user-centric designs and interactive prototypes to visualize the final product before coding begins."
  },
  {
    icon: <Code className="w-8 h-8" style={{ color: 'var(--accent-2)' }} />,
    title: "Development",
    description: "We bring designs to life using clean, modern code and cutting-edge technologies for optimal performance."
  },
  {
    icon: <CheckCircle className="w-8 h-8" style={{ color: 'var(--accent-1)' }} />,
    title: "Testing & QA",
    description: "Rigorous testing across devices and browsers ensures a bug-free, seamless experience for your users."
  },
  {
    icon: <Rocket className="w-8 h-8" style={{ color: 'var(--accent-2)' }} />,
    title: "Launch & Delivery",
    description: "We handle the deployment process smoothly, ensuring your website goes live without a hitch."
  },
  {
    icon: <HeartHandshake className="w-8 h-8" style={{ color: 'var(--accent-1)' }} />,
    title: "Support & Growth",
    description: "Our partnership continues with ongoing support, maintenance, and strategies to help your digital presence grow."
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="process-section" ref={containerRef}>
      <div className="process-bg-glow" />

      <div className="process-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="process-header"
        >
          <span className="process-badge">
            How We Work
          </span>
          <h2 className="process-header-title">Our Workflow Process</h2>
          <p className="process-header-desc">
            From the initial spark of an idea to the final launch, we follow a structured process to ensure excellence at every step.
          </p>
        </motion.div>

        <div className="process-timeline">
          {/* Vertical Line */}
          <div className="process-timeline-line">
            <motion.div
              className="process-timeline-fill"
              style={{
                scaleY: scaleY,
                originY: 0,
                height: "100%"
              }}
            />
          </div>

          <div className="process-steps-wrapper">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`process-step ${index % 2 === 0 ? 'even' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="process-dot-container">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="process-dot"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="process-dot-ring"
                  />
                </div>

                {/* Card Side */}
                <div className="process-card-wrapper">
                  <div className="process-card">
                    <div className="process-card-border-glow" />
                    <div className="process-icon-wrapper">
                      {step.icon}
                    </div>
                    <h3 className="process-card-title">
                      <span className="process-step-num">0{index + 1}.</span> {step.title}
                    </h3>
                    <p className="process-card-desc">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Empty Spacer Side */}
                <div className="process-spacer" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
