import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const processRef = useRef(null);

  // Team members data
  const teamMembers = [
    {
      name: 'Emma Emrick',
      role: 'Founder & Master Perfumer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      bio: 'With over 15 years of experience in the fragrance industry, Emma founded Emrickscents with a vision to create luxury perfumes that tell a story and evoke emotions.'
    },
    {
      name: 'Daniel Laurent',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      bio: 'Daniel brings his background in fashion and luxury branding to Emrickscents, overseeing the creative vision and aesthetic of the brand.'
    },
    {
      name: 'Sophia Chen',
      role: 'Head of Product Development',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      bio: 'With a PhD in Chemistry and a passion for scent, Sophia leads our product development team, ensuring each fragrance meets our exacting standards.'
    },
    {
      name: 'James Wilson',
      role: 'Sustainability Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      bio: 'James ensures that our commitment to sustainability is reflected in every aspect of our business, from ingredient sourcing to packaging.'
    }
  ];

  // Values data
  const values = [
    {
      title: 'Artistry',
      description: 'We approach perfumery as an art form, blending creativity with technical expertise to create fragrances that are truly unique.'
    },
    {
      title: 'Quality',
      description: 'We source only the finest ingredients from around the world, ensuring that each perfume meets our exacting standards.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to ethical sourcing and sustainable practices, minimizing our environmental impact at every step.'
    },
    {
      title: 'Innovation',
      description: 'We continuously explore new techniques and ingredients, pushing the boundaries of traditional perfumery.'
    }
  ];

  // Process steps
  const processSteps = [
    {
      number: '01',
      title: 'Inspiration',
      description: 'Every fragrance begins with inspiration – a memory, a place, an emotion, or a story that we want to capture in scent.'
    },
    {
      number: '02',
      title: 'Ingredient Selection',
      description: 'We carefully select the finest ingredients from around the world, working with sustainable producers who share our values.'
    },
    {
      number: '03',
      title: 'Formulation',
      description: 'Our master perfumers craft each fragrance through a meticulous process of blending and refinement, often creating hundreds of iterations.'
    },
    {
      number: '04',
      title: 'Maturation',
      description: 'Once formulated, our fragrances are left to mature, allowing the ingredients to harmonize and develop their full complexity.'
    },
    {
      number: '05',
      title: 'Quality Testing',
      description: 'Each batch undergoes rigorous testing to ensure consistency, quality, and longevity before being approved for bottling.'
    },
    {
      number: '06',
      title: 'Presentation',
      description: 'Finally, our fragrances are bottled and packaged with the same attention to detail that goes into their creation.'
    }
  ];

  // GSAP animations
  useEffect(() => {
    // Story section animation
    gsap.fromTo(
      '.story-image',
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      '.story-content',
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Values animation
    gsap.fromTo(
      '.value-card',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: valuesRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Team animation
    gsap.fromTo(
      '.team-member',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );

    // Process animation
    gsap.fromTo(
      '.process-step',
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-primary"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Perfume Laboratory" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container-custom relative z-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-light mb-6">
            Our <span className="text-secondary">Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Crafting luxury fragrances with passion, precision, and purpose
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 bg-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="story-image overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Emrickscents Founder" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="story-content">
              <SectionTitle 
                title="Our Journey" 
                subtitle="" 
                align="left"
                withLine={false}
              />
              <p className="text-gray-300 mb-6 leading-relaxed">
                Founded in 2020 by master perfumer Emma Emrick, Emrickscents was born from a passion for artisanal perfumery and a desire to create fragrances that tell a story. After years of training under renowned perfumers in Grasse, France, Emma established our atelier with a vision to blend traditional craftsmanship with modern innovation.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                What began as a small collection of handcrafted scents has grown into a celebrated luxury fragrance house, known for our distinctive blends and commitment to quality. Today, Emrickscents continues to push the boundaries of perfumery, creating scents that captivate the senses and evoke powerful emotions.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Each Emrickscents fragrance is crafted with meticulous attention to detail, using only the finest ingredients sourced from sustainable producers around the globe. We believe in creating scents that not only smell exquisite but also tell a story and create lasting memories.
              </p>
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80" 
                  alt="Emma Emrick" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-light font-medium">Emma Emrick</p>
                  <p className="text-secondary">Founder & Master Perfumer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section ref={valuesRef} className="py-20 bg-gradient-luxury">
        <div className="container-custom">
          <SectionTitle 
            title="Our Values" 
            subtitle="The principles that guide everything we do at Emrickscents"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="value-card bg-dark bg-opacity-50 backdrop-blur-lg border border-gray-800 rounded-xl p-8 shadow-luxury"
              >
                <h3 className="text-secondary font-serif text-2xl mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-dark">
        <div className="container-custom">
          <blockquote className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-light italic mb-6 leading-relaxed">
              "Perfume is the art that makes memory speak. It is the most powerful accessory of a woman and the most important invisible part of her style."
            </p>
            <footer className="text-secondary text-xl">— Emma Emrick</footer>
          </blockquote>
        </div>
      </section>

      {/* Our Process Section */}
      <section ref={processRef} className="py-20 bg-primary">
        <div className="container-custom">
          <SectionTitle 
            title="Our Process" 
            subtitle="From inspiration to creation, every step in our perfume-making journey is guided by passion and precision"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="process-step bg-dark rounded-lg p-8 border border-gray-800"
              >
                <span className="text-4xl font-serif text-secondary opacity-50 block mb-4">{step.number}</span>
                <h3 className="text-xl font-serif text-light mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section ref={teamRef} className="py-20 bg-dark">
        <div className="container-custom">
          <SectionTitle 
            title="Meet Our Team" 
            subtitle="The passionate individuals behind Emrickscents who bring our vision to life"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="team-member bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-light mb-1">{member.name}</h3>
                  <p className="text-secondary mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-luxury">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-light mb-6">Experience Emrickscents</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our collection of luxury fragrances and find the perfect scent to express your unique style and personality.
          </p>
          <Button to="/shop" variant="primary" size="lg">
            Explore Our Collection
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default About;