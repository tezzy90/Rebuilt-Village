import React from 'react';
import { Section } from '../components/Section';

export const Terms: React.FC = () => {
    return (
        <>
            <div className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-4">Terms of Service</h1>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        Terms and conditions for using our website and participating in our programs.
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
                        <h2 className="text-white text-2xl mb-4">Agreement to Terms</h2>
                        <p className="text-slate-300 leading-relaxed">
                            By accessing or using the Rebuilt Village website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">About Rebuilt Village</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Rebuilt Village is a 501(c)(3) nonprofit organization dedicated to empowering youth through film education in Ocoee, Florida. Our mission is to provide access to professional filmmaking tools and mentorship to students who might not otherwise have these opportunities.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Use of Website</h2>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Permitted Use</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You may use our website for lawful purposes only. You agree not to:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe on the rights of others</li>
                            <li>Transmit harmful or malicious code</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Scrape or data mine our website without permission</li>
                            <li>Use our website to harass, abuse, or harm others</li>
                        </ul>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Age Restrictions</h3>
                        <p className="text-slate-300 leading-relaxed">
                            Our website is appropriate for all ages. However, certain interactive features may require parental consent for users under 13 years of age, in compliance with COPPA (Children's Online Privacy Protection Act).
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Program Participation</h2>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Enrollment</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Enrollment in Rebuilt Village programs requires completion of registration forms and, for minors, parental/guardian consent. Acceptance into programs is subject to availability and may have age or skill requirements.
                        </p>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Code of Conduct</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            All program participants must:
                        </p>
                        <ul className="text-slate-300 space-y-2 mb-6 list-disc pl-6">
                            <li>Treat all participants, staff, and equipment with respect</li>
                            <li>Follow safety guidelines when using filmmaking equipment</li>
                            <li>Arrive on time and be prepared for sessions</li>
                            <li>Create content that is appropriate and respectful</li>
                            <li>Not engage in bullying, harassment, or discriminatory behavior</li>
                        </ul>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Violation of the code of conduct may result in removal from the program without refund.
                        </p>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Equipment Use</h3>
                        <p className="text-slate-300 leading-relaxed">
                            Participants will have access to professional filmmaking equipment. Participants and their parents/guardians are responsible for any damage to equipment resulting from misuse or negligence.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Donations and Payments</h2>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Tax Deductibility</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Rebuilt Village is a 501(c)(3) tax-exempt organization (EIN: 12-3456789). Donations are tax-deductible to the extent allowed by law. You will receive a receipt for tax purposes.
                        </p>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Refund Policy</h3>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong>Donations:</strong> All donations are final and non-refundable unless made in error.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            <strong>Program Fees:</strong> Program fees may be refunded up to 14 days before the program start date, minus a 10% administrative fee. No refunds will be issued after this deadline except in cases of medical emergency or program cancellation by Rebuilt Village.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Intellectual Property</h2>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Student Work</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Students retain copyright to original films and creative works they produce during our programs. However, by participating, students grant Rebuilt Village a non-exclusive license to display, share, and use student work for promotional, educational, and fundraising purposes. Students will be credited appropriately.
                        </p>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Website Content</h3>
                        <p className="text-slate-300 leading-relaxed">
                            All content on this website, including text, graphics, logos, and images (except student work), is the property of Rebuilt Village and is protected by copyright law. You may not reproduce, distribute, or use this content without our written permission.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Liability and Disclaimers</h2>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Assumption of Risk</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Participation in Rebuilt Village programs involves the use of equipment and physical activity. Parents/guardians acknowledge and assume risks associated with program participation. Rebuilt Village maintains appropriate insurance coverage and takes reasonable safety precautions.
                        </p>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Limitation of Liability</h3>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            To the fullest extent permitted by law, Rebuilt Village shall not be liable for any indirect, incidental, special, or consequential damages arising from use of our website or participation in our programs.
                        </p>

                        <h3 className="text-secondary text-xl mb-3 font-mono">Website Availability</h3>
                        <p className="text-slate-300 leading-relaxed">
                            We strive to maintain our website, but we do not guarantee uninterrupted or error-free access. The website is provided "as is" without warranties of any kind.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Third-Party Links</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of service of these external sites.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Modifications to Terms</h2>
                        <p className="text-slate-300 leading-relaxed">
                            We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our website or services after changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Governing Law</h2>
                        <p className="text-slate-300 leading-relaxed">
                            These Terms of Service are governed by the laws of the State of Florida, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Orange County, Florida.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-white text-2xl mb-4">Contact Information</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
                            <p className="text-slate-300 font-mono text-sm">
                                <strong className="text-white">Rebuilt Village</strong><br />
                                Ocoee, FL 34761<br />
                                Email: info@rebuiltvillage.org<br />
                                Phone: (407) XXX-XXXX
                            </p>
                        </div>
                    </section>
                </div>
            </Section>
        </>
    );
};
