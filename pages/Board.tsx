import React from 'react';
import { Section } from '../components/Section';
import { Users, Linkedin, Mail } from 'lucide-react';
import { Button } from '../components/Button';

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
            imageUrl: "https://ui-avatars.com/api/?name=Jane+Anderson&size=400&background=020617&color=0d9488&bold=true",
            linkedin: "#",
            email: "jane.anderson@rebuiltvillage.org"
        },
        {
            name: "Michael Chen",
            title: "Vice Chair",
            bio: "Michael is a technology executive and entrepreneur who believes in the power of storytelling. He brings expertise in digital media and operations to the board.",
            imageUrl: "https://ui-avatars.com/api/?name=Michael+Chen&size=400&background=020617&color=f97316&bold=true",
            linkedin: "#"
        },
        {
            name: "Sarah Williams",
            title: "Treasurer",
            bio: "Sarah is a CPA with a specialty in nonprofit accounting. She ensures financial transparency and sustainability for Rebuilt Village's mission.",
            imageUrl: "https://ui-avatars.com/api/?name=Sarah+Williams&size=400&background=020617&color=0d9488&bold=true",
            linkedin: "#",
            email: "sarah.williams@rebuiltvillage.org"
        },
        {
            name: "David Rodriguez",
            title: "Secretary",
            bio: "David is an attorney specializing in education law. He advocates for equitable access to arts education in underserved communities.",
            imageUrl: "https://ui-avatars.com/api/?name=David+Rodriguez&size=400&background=020617&color=f97316&bold=true",
            linkedin: "#"
        },
        {
            name: "Emily Thompson",
            title: "Education Specialist",
            bio: "Emily is a high school film teacher in Orange County. She brings classroom experience and deep understanding of student needs to the board.",
            imageUrl: "https://ui-avatars.com/api/?name=Emily+Thompson&size=400&background=020617&color=0d9488&bold=true",
            email: "emily.thompson@rebuiltvillage.org"
        },
        {
            name: "Marcus Johnson",
            title: "Creative Advisor",
            bio: "Marcus is a cinematographer and community organizer. He is committed to empowering youth voices through visual media.",
            imageUrl: "https://ui-avatars.com/api/?name=Marcus+Johnson&size=400&background=020617&color=f97316&bold=true",
            linkedin: "#"
        }
    ];

    return (
        <>
            <Section bg="black" className="pt-32">
                <div className="text-center">
                    <div className="font-mono text-[10px] text-primary mb-4 uppercase tracking-[0.4em] font-bold opacity-60">Executive Committee</div>
                    <h1 className="text-5xl md:text-7xl font-serif italic tracking-tight text-white mb-8">Board of Directors</h1>
                    <div className="h-1 w-24 bg-primary/30 mx-auto mb-10"></div>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Meet the dedicated leaders guiding Rebuilt Village's mission to empower youth through professional-grade film education.
                    </p>
                </div>
            </Section>

            <Section bg="black">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {boardMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-slate-900/40 border border-slate-800 p-8 group hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                {/* Image / Avatar */}
                                <div className="aspect-square bg-black border border-slate-800 mb-8 overflow-hidden relative">
                                    <img
                                        src={member.imageUrl}
                                        alt={member.name}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                </div>

                                {/* Info */}
                                <div>
                                    <div className="font-mono text-[9px] text-primary mb-3 uppercase tracking-[0.2em] font-bold">
                                        {member.title}
                                    </div>
                                    <h3 className="text-3xl font-serif italic text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
                                        {member.bio}
                                    </p>

                                    {/* Contact */}
                                    <div className="flex space-x-6 pt-6 border-t border-slate-800">
                                        {member.linkedin && (
                                            <a
                                                href={member.linkedin}
                                                className="text-slate-500 hover:text-white transition-colors"
                                                aria-label={`${member.name} LinkedIn`}
                                            >
                                                <Linkedin size={18} />
                                            </a>
                                        )}
                                        {member.email && (
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-slate-500 hover:text-white transition-colors"
                                                aria-label={`Email ${member.name}`}
                                            >
                                                <Mail size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Join the Board CTA */}
                    <div className="mt-24 text-center border-t border-slate-900 pt-20">
                        <div className="max-w-xl mx-auto p-12 bg-slate-900/20 border border-dashed border-slate-800">
                            <h3 className="text-3xl font-serif italic text-white mb-6">
                                Executive Producer Call
                            </h3>
                            <p className="text-slate-400 max-w-md mx-auto mb-10 leading-relaxed font-light">
                                We're always looking for passionate individuals who can contribute their expertise to advance our mission. Interested in a leadership role?
                            </p>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.location.href = 'mailto:info@rebuiltvillage.org?subject=Board of Directors Inquiry'}
                            >
                                Apply to Board
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};
