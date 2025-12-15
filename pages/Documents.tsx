import React from 'react';
import { Section } from '../components/Section';
import { FileText, Download, ExternalLink, Calendar } from 'lucide-react';

interface Document {
    title: string;
    description: string;
    year: string;
    type: 'tax' | 'financial' | 'governance' | 'annual';
    fileUrl?: string;
    externalUrl?: string;
}

export const Documents: React.FC = () => {
    const documents: Document[] = [
        {
            title: "Form 990 (2024)",
            description: "Annual tax return filed with the IRS showing our financial activities and governance.",
            year: "2024",
            type: "tax",
            fileUrl: "#"
        },
        {
            title: "Form 990 (2023)",
            description: "Previous year tax return for transparency and reference.",
            year: "2023",
            type: "tax",
            fileUrl: "#"
        },
        {
            title: "Annual Report 2024",
            description: "Comprehensive overview of our programs, impact, and financial performance.",
            year: "2024",
            type: "annual",
            fileUrl: "#"
        },
        {
            title: "Audited Financial Statements (2024)",
            description: "Independently audited financial statements showing our fiscal responsibility.",
            year: "2024",
            type: "financial",
            fileUrl: "#"
        },
        {
            title: "IRS Determination Letter",
            description: "Official 501(c)(3) tax-exempt status confirmation from the IRS.",
            year: "2023",
            type: "governance",
            fileUrl: "#"
        },
        {
            title: "Bylaws",
            description: "Governing documents outlining organizational structure and procedures.",
            year: "2024",
            type: "governance",
            fileUrl: "#"
        },
        {
            title: "Conflict of Interest Policy",
            description: "Board and staff policies ensuring ethical governance.",
            year: "2024",
            type: "governance",
            fileUrl: "#"
        },
        {
            title: "Financial Reports (Q4 2024)",
            description: "Quarterly financial summary for donors and stakeholders.",
            year: "2024",
            type: "financial",
            fileUrl: "#"
        }
    ];

    const getTypeColor = (type: Document['type']) => {
        switch (type) {
            case 'tax': return 'text-primary border-primary/30 bg-primary/5';
            case 'financial': return 'text-green-500 border-green-500/30 bg-green-500/5';
            case 'governance': return 'text-secondary border-secondary/30 bg-secondary/5';
            case 'annual': return 'text-purple-500 border-purple-500/30 bg-purple-500/5';
            default: return 'text-slate-500 border-slate-500/30 bg-slate-500/5';
        }
    };

    const getTypeLabel = (type: Document['type']) => {
        switch (type) {
            case 'tax': return 'Tax Document';
            case 'financial': return 'Financial';
            case 'governance': return 'Governance';
            case 'annual': return 'Annual Report';
            default: return 'Document';
        }
    };

    return (
        <>
            <div className="bg-gradient-to-br from-slate-900 to-black text-white py-20 border-b border-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <FileText size={48} className="mx-auto mb-6 text-primary" />
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Documents & Transparency</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Access our tax returns, financial reports, and governance documents. We believe in radical transparency.
                    </p>
                </div>
            </div>

            <Section bg="dark">
                <div className="max-w-5xl mx-auto">

                    {/* Intro Section */}
                    <div className="bg-slate-900 border border-slate-800 p-8 mb-12">
                        <h2 className="text-2xl font-serif italic text-white mb-4">Our Commitment to Transparency</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            As a 501(c)(3) nonprofit organization, Rebuilt Village is committed to operating with the highest standards of accountability and transparency. We make our key documents publicly available so donors, partners, and community members can see exactly how we operate.
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 mt-8">
                            <div className="bg-black border border-slate-800 p-4">
                                <div className="font-mono text-xs text-primary mb-1 uppercase tracking-widest">EIN</div>
                                <div className="text-white font-serif text-lg">12-3456789</div>
                            </div>
                            <div className="bg-black border border-slate-800 p-4">
                                <div className="font-mono text-xs text-primary mb-1 uppercase tracking-widest">Status</div>
                                <div className="text-white font-serif text-lg">501(c)(3) Nonprofit</div>
                            </div>
                            <div className="bg-black border border-slate-800 p-4">
                                <div className="font-mono text-xs text-primary mb-1 uppercase tracking-widest">Founded</div>
                                <div className="text-white font-serif text-lg">2023</div>
                            </div>
                        </div>
                    </div>

                    {/* Documents Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {documents.map((doc, index) => (
                            <div
                                key={index}
                                className="bg-slate-900 border border-slate-800 p-6 hover:border-primary transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 border ${getTypeColor(doc.type)}`}>
                                            {getTypeLabel(doc.type)}
                                        </div>
                                        <h3 className="text-xl font-serif italic text-white mb-2 group-hover:text-primary transition-colors">
                                            {doc.title}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                            {doc.description}
                                        </p>
                                        <div className="flex items-center text-xs text-slate-500 font-mono">
                                            <Calendar size={14} className="mr-2" />
                                            {doc.year}
                                        </div>
                                    </div>
                                    <FileText className="text-slate-700 group-hover:text-primary transition-colors ml-4 flex-shrink-0" size={32} />
                                </div>

                                {/* Download Button */}
                                <a
                                    href={doc.fileUrl || doc.externalUrl || '#'}
                                    className="flex items-center justify-center space-x-2 w-full py-3 bg-black border border-slate-700 text-slate-300 hover:border-primary hover:text-primary transition-all font-mono text-xs uppercase tracking-widest"
                                    target={doc.externalUrl ? "_blank" : undefined}
                                    rel={doc.externalUrl ? "noopener noreferrer" : undefined}
                                >
                                    {doc.externalUrl ? (
                                        <>
                                            <ExternalLink size={16} />
                                            <span>View Online</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            <span>Download PDF</span>
                                        </>
                                    )}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* External Transparency Sites */}
                    <div className="mt-16 bg-black border border-slate-800 p-8">
                        <h3 className="text-2xl font-serif italic text-white mb-6">Find Us On Third-Party Platforms</h3>
                        <p className="text-slate-400 mb-8">
                            You can also view our information on these independent nonprofit transparency platforms:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a
                                href="https://www.guidestar.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 hover:border-primary transition-colors group"
                            >
                                <span className="text-white font-mono text-sm">GuideStar</span>
                                <ExternalLink size={16} className="text-slate-600 group-hover:text-primary" />
                            </a>
                            <a
                                href="https://www.charitynavigator.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 hover:border-primary transition-colors group"
                            >
                                <span className="text-white font-mono text-sm">Charity Navigator</span>
                                <ExternalLink size={16} className="text-slate-600 group-hover:text-primary" />
                            </a>
                            <a
                                href="https://www.propublica.org/nonprofits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 hover:border-primary transition-colors group"
                            >
                                <span className="text-white font-mono text-sm">ProPublica</span>
                                <ExternalLink size={16} className="text-slate-600 group-hover:text-primary" />
                            </a>
                        </div>
                    </div>

                    {/* Contact for Questions */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-400 mb-4">
                            Have questions about our finances or governance?
                        </p>
                        <a
                            href="mailto:info@rebuiltvillage.org"
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
