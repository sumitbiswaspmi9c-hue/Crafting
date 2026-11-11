import React from 'react';
import SplitText from './SplitText';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Abhinav',
      role: 'CEO @ CallKaro AI',
      quote:
        'One thing that truly stood out while working with Sumit is his incredible speed. He has a rare ability to spin up clean, functional landing pages in no time. Whether it’s a quick iteration or a fresh build, you can always count on Hyper Studio to deliver with speed and precision.',
    },
    {
      name: 'Ayo',
      role: 'Software Developer @ Freelance',
      quote:
        'Working with Sumit was seamless. I came with just an idea, and he turned it into a sleek, high-performing eCommerce site. He handled everything—from design to development—while keeping me in the loop. Highly recommend him and the Hyper Studio team for turning vague visions into real products.',
    },
    {
      name: 'Ifranulla',
      role: 'Content Creator @ Independent',
      quote:
        'I wanted a platform that captured my journey and love for Bengali — Sumit delivered exactly that. The portfolio feels personal, professional, and culturally respectful. Grateful for the care and creativity he brought to the entire process.',
    },
    {
      name: 'Neha',
      role: 'Marketing Manager @ GlowWave Media',
      quote:
        'Sumit built a vibrant landing page for our product launch — fast, responsive, and exactly to the brief. His ability to understand brand voice and turn it into a clean website experience is unmatched.',
    },
    {
      name: 'Rohan',
      role: 'Founder @ Bloom Analytics',
      quote:
        'Hyper Studio helped us move from a basic idea to a polished landing page in record time. Sumit’s suggestions on layout, flow, and CTAs clearly show he understands not just design but real conversion strategies.',
    },
    {
      name: 'Aditi',
      role: 'Operations Lead @ CraftNest',
      quote:
        'Working with Sumit was stress-free and efficient. He took ownership of the project, communicated regularly, and delivered a stunning landing page that now serves as the face of our brand online.',
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-24 sm:py-32 bg-black z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-16 sm:mb-24">
          <SplitText
            text="TESTIMONIALS"
            tag="h2"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#EAE6E1] uppercase"
            delay={35}
            duration={0.6}
            animationFrom={{ opacity: 0, y: 40 }}
            animationTo={{ opacity: 1, y: 0 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-[#161922] border border-white/5 p-8 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <img
                  src="/portfolio/review-slash.e9b9ed14.svg"
                  alt="Quotes"
                  className="w-5 h-5 opacity-60"
                />
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-8">
                <h3 className="text-base font-bold text-white tracking-tight">{item.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
