import React from 'react';
import { Section } from '../components/Section';
import { Users, Linkedin, Mail } from 'lucide-react';

interface BoardMember {
    name: string;
    title: string;
    bio: string;
    imageUrl: string;
    linkedin?: string;
    email?: string;
}

export const Board: React.FC = () => {
    const boardMembers: BoardMember[] = [
        {
            name: "Jane Anderson",
            title: "Board Chair",
            bio: "Jane is a film producer with 15+ years of experience in documentary filmmaking. She is passionate about arts education and serves on multiple nonprofit boards in Central Florida.",
            imageUrl: "https://ui-avatars.com/api/?name=Jane+Anderson&size=400&background=0d9488&color=fff&bold=true",
            linkedin: "#",
            email: "jane.anderson@rebuiltvillage.org"
        },
        {
            name: "Michael Chen",
            title: "Vice Chair",
            bio: "Michael is a technology executive and entrepreneur who believes in the power of storytelling. He brings expertise in digital media and operations to the board.",
            imageUrl: "https://ui-avatars.com/api/?name=Michael+Chen&size=400&background=f97316&color=fff&bold=true",
            linkedin: "#"
        },
        {
            name: "Sarah Williams",
            title: "Treasurer",
            bio: "Sarah is a CPA with a specialty in nonprofit accounting. She ensures financial transparency and sustainability for Rebuilt Village's mission.",
            imageUrl: "https://ui-avatars.com/api/?name=Sarah+Williams&size=400&background=0d9488&color=fff&bold=true",
            linkedin: "#",
            email: "sarah.williams@rebuiltvillage.org"
        },
        {
            name: "David Rodriguez",
            title: "Secretary",
            bio: "David is an attorney specializing in education law. He advocates for equitable access to arts education in underserved communities.",
            imageUrl: "https://ui-avatars.com/api/?name=David+Rodriguez&size=400&background=f97316&color=fff&bold=true",
            linkedin: "#"
        },
        {
            name: "Emily Thompson",
            title: "Board Member",
            bio: "Emily is a high school film teacher in Orange County. She brings classroom experience and deep understanding of student needs to the board.",
            imageUrl: "https://ui-avatars.com/api/?name=Emily+Thompson&size=400&background=0d9488&color=fff&bold=true",
            email: "emily.thompson@rebuiltvillage.org"
        },
        {
            name: "Marcus Johnson",
            title: "Board Member",
            bio: "Marcus is a cinematographer and community organizer. He is committed to empowering youth voices through visual media.",
            imageUrl: "https://ui-avatars.com/api/?name=Marcus+Johnson&size=400&background=f97316&color=fff&bold=true",
            linkedin: "#"
        }
    ];

    return (
        <>
            <div className="bg-gradient-to-br from-primary to-teal-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <Users size={48} className="mx-auto mb-6 opacity-90" />
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Board of Directors</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">
                        Meet the dedicated leaders guiding Rebuilt Village's mission to empower youth through film education.
                    </p>
                </div>
            </div>

            <Section bg="dark">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-serif italic text-white mb-6">Our Leadership</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Our Board of Directors brings diverse expertise in film, education, nonprofit management, and community development. Together, they ensure Rebuilt Village remains committed to excellence, transparency, and impact.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {boardMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-slate-900 border border-slate-800 overflow-hidden group hover:border-primary transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-square bg-black overflow-hidden">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="font-mono text-xs text-primary mb-2 uppercase tracking-widest">
                                        {member.title}
                                    </div>
                                    <h3 className="text-2xl font-serif italic text-white mb-4">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        {member.bio}
                                    </p>

                                    {/* Contact */}
                                    <div className="flex space-x-4">
                                        {member.linkedin && (
                                            <a
                                                href={member.linkedin}
                                                className="text-slate-500 hover:text-primary transition-colors"
                                                aria-label={`${member.name} LinkedIn`}
                                            >
                                                <Linkedin size={20} />
                                            </a>
                                        )}
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-slate-500 hover:text-primary transition-colors"
                                                aria-label={`Email ${member.name}`}
                                            >
                                                <Mail size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Join the Board CTA */}
                    <div className="mt-20 bg-black border-t border-b border-slate-800 py-16 text-center">
                        <h3 className="text-3xl font-serif italic text-white mb-4">
                            Interested in Joining Our Board?
                        </h3>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                            We're always looking for passionate individuals who can contribute their expertise to advance our mission. Board members typically serve three-year terms and meet quarterly.
                        </p>
                        <a
                            href="mailto:info@rebuiltvillage.org?subject=Board of Directors Inquiry"
                            className="inline-block px-8 py-3 bg-primary text-white font-mono text-sm uppercase tracking-widest hover:bg-teal-600 transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </Section>
        </>
    );
};
