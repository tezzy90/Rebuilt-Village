import React from 'react';
import { Section } from '../components/Section';

export const Privacy: React.FC = () => {
    return (
        <>
            <div className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Privacy Policy</h1>
                    <p className="text-xl text-teal-100 max-w-2xl mx-auto">
                        Your privacy matters to us. Learn how we collect, use, and protect your information.
                    </p>
                </div>
            </div>

            <Section bg="dark">
                <div className="max-w-4xl mx-auto prose prose-invert prose-headings:font-serif prose-headings:italic">
                    <p className="text-slate-400 text-sm mb-8">
                        <strong>Effective Date:</strong> December 15, 2024<br />
                        <strong>Last Updated:</strong> December 15, 2024
                    </p>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Introduction</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Rebuilt Village ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our programs.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            As a 501(c)(3) nonprofit organization, we are committed to transparency and responsible data handling practices.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Information We Collect</h2>

                        <h3 className="text-primary text-xl mb-3 font-mono">Personal Information</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We may collect personal information that you voluntarily provide to us when you:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Register for our programs</li>
                            <li>Make a donation</li>
                            <li>Subscribe to our newsletter</li>
                            <li>Contact us through our website</li>
                            <li>Attend our events</li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            This information may include: name, email address, phone number, mailing address, payment information, and emergency contact information (for program participants).
                        </p>

                        <h3 className="text-primary text-xl mb-3 font-mono">Minor Information</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            For students participating in our programs, we collect information with parental/guardian consent including: student name, age, grade level, school, parent/guardian contact information, emergency contacts, medical information relevant to program participation, and photo/video release permissions.
                        </p>

                        <h3 className="text-primary text-xl mb-3 font-mono">Automatically Collected Information</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            When you visit our website, we may automatically collect:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Browser type and version</li>
                            <li>Operating system</li>
                            <li>IP address</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website addresses</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">How We Use Your Information</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We use the information we collect to:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Administer and improve our educational programs</li>
                            <li>Process donations and send receipts for tax purposes</li>
                            <li>Communicate with you about programs, events, and news</li>
                            <li>Ensure the safety and wellbeing of program participants</li>
                            <li>Comply with legal obligations</li>
                            <li>Send newsletters (with your consent)</li>
                            <li>Improve our website and user experience</li>
                            <li>Respond to inquiries and provide customer service</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Donor Privacy</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We respect the privacy of our donors. We do not sell, trade, or share donor information with third parties except:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>As required by law</li>
                            <li>With service providers who help us process donations (e.g., payment processors)</li>
                            <li>With your explicit consent</li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed">
                            Donors may request to remain anonymous in public acknowledgments by contacting us at info@rebuiltvillage.org.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Photo and Video Policy</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            As a film education nonprofit, we frequently photograph and video our students and programs. We:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Obtain written consent from parents/guardians before photographing or filming minors</li>
                            <li>Use photos and videos for promotional, educational, and fundraising purposes</li>
                            <li>Never include personally identifiable information (such as full names or addresses) with published images without explicit permission</li>
                            <li>Honor opt-out requests from parents/guardians</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Data Security</h2>
                        <p className="text-slate-300 leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Third-Party Services</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We may use third-party service providers to help us operate our website and programs, including:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Payment processors (e.g., Stripe, PayPal)</li>
                            <li>Email service providers</li>
                            <li>Analytics services (e.g., Google Analytics)</li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed">
                            These third parties have access to your information only to perform specific tasks on our behalf and are obligated to protect your information.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Your Rights</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You have the right to:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your information (subject to legal obligations)</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Withdraw consent for photo/video use (for future uses)</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Children's Privacy</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Our programs serve minors, and we take special care to protect children's privacy. We only collect information about minors with verifiable parental consent. Parents have the right to review, request changes to, or request deletion of their child's information.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Changes to This Policy</h2>
                        <p className="text-slate-300 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website with an updated "Last Updated" date.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Contact Us</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                        </p>
                        <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
                            <p className="text-slate-300 font-mono text-sm">
                                <strong className="text-white">Rebuilt Village</strong><br />
                                Ocoee, FL 34761<br />
                                Email: info@rebuiltvillage.org<br />
                                EIN: 12-3456789
                            </p>
                        </div>
                    </section>
                </div>
            </Section>
        </>
    );
};
