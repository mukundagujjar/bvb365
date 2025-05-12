import GlobalLink from "@/components/GlobalLink";
import Link from "next/link";
import Image from "next/image";

const ContactPageComponent = () => {
    return (
        <div className="flex flex-col gap-8 md:text-lg md:w-1/2">
            <p>For now, all dealings regarding payments and enquiries are done manually by directly contacting <span className="font-bold underline underline-offset-4">Vasudev Kittur</span> (our lead trader).</p>
            <p>You may contact him via the below links:</p>
            <div className="flex flex-col md:flex-row gap-4">
                <GlobalLink href="https://wa.me/917709203276?text=I%20am%20interested%20in%20your%20investment%20services" title="WhatsApp" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />
                <GlobalLink href="tel:+917709203276" title="Call" additionalClasses="outline outline-foreground" />
            </div>
        </div>
    );
}

const AboutPageComponent = () => {
    return (
        <div className="flex flex-col gap-8 md:text-lg md:w-1/2">
            <p>
                Bulls v/s Bears (BvB) is a specialized investment management agency led by Vasudev Kittur, who brings over 4 years of hands-on experience trading in the Indian stock market. Our approach combines strategic analysis with disciplined execution, allowing us to navigate market volatility while pursuing consistent returns for our clients. We pride ourselves on transparency and adaptability, keeping our clients' financial goals at the center of every investment decision.
            </p>

            <p>
                Under Vasudev's leadership, BvB has established a strong track record of performance, delivering more than 50% returns to clients on over 60% of occasions. We achieve this through a balanced approach to risk management, utilizing both conservative and dynamic strategies across various market segments including equities, futures, and options. While we maintain that all investments carry inherent risk, our proven methodology aims to consistently outperform market averages for our valued investors.
            </p>

            <GlobalLink href="/contact" title="Contact Us" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />

        </div>
    );
}

const services = [
    {
        id: 1,
        title: "Investment Services",
        cost: "Minimum Investment: ₹1,00,000",
        description: [
            "20% of your total investment is allocated as trading capital to generate profits.",
            "We guarantee a minimum of 8% profit per month on your total investment.",
            "We ensure that your account always maintains at least 80% of your original investment, regardless of market conditions.",
            "Our fee is just 5% of the profits generated, not your total investment.",
            "We recommend a 3-month lock-in period for optimal returns. In case of an early withdrawal, we will only return 80% of your investment.",
            "All investments are subject to market risk. We are not SEBI registered."
        ]
    },
    {
        id: 2,
        title: "Live Trading Sessions",
        cost: "₹5,000 per month",
        description: [
            "Join us on Google Meet to observe our trading process in real-time.",
            "Receive actionable trading options and recommendations during the session.",
            "Learn valuable trading strategies and market insights as you watch.",
            "Perfect for those who prefer to execute trades themselves with expert guidance."
        ]
    },
    {
        id: 3,
        title: "Coaching Package",
        cost: "₹25,000 (one-time payment)",
        description: [
            "Get a comprehensive coaching package that covers everything from basic to advanced trading.",
            "Reference notes, educational materials, and resources to help you understand our trading strategies.",
            "Three months of FREE live trading sessions with expert guidance.",
            "Perfect for those who want to become a self-sufficient trader with expert guidance."
        ]
    }
]

const ServicesPageComponent = () => {
    return (
        <div className="flex flex-col gap-8 items-center md:items-start">
            {
                services.map((service) => (
                    <div key={service.id} className="flex flex-col gap-4">
                        <h3 className="text-xl md:text-2xl font-semibold">{service.title}</h3>
                        <p className="font-medium text-sm bg-amber-400 px-2 py-1 w-fit text-foreground dark:text-background">{service.cost}</p>
                        <ul className="flex flex-col list-disc pl-5 gap-2">
                            {service.description.map((description, index) => (
                                <li key={index} className="font-light text-sm md:text-base">{description}</li>
                            ))}
                        </ul>

                    </div>
                ))
            }

            <GlobalLink href="/contact" title="Contact Us" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />
        </div>
    );
}

const LegalPageComponent = () => {
    return (
        <div className="container"> {/* Added a container for better centering and padding */}
            {/* Privacy Policy Section */}
            <div className="mb-12"> {/* Add some space between sections */}
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Privacy Policy</h1> {/* Added a main title */}
                <blockquote className="mt-6 border-l-2 pl-6 italic">Last updated: March 01, 2025</blockquote>
                <br />

                <p>
                    This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <br />

                <p>
                    We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Interpretation and Definitions</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Interpretation</h3>
                <br />
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Definitions</h3>
                <br />
                <p>For the purposes of this Privacy Policy:</p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Account means a unique account created for You to access our Service or parts of our Service.</li>
                    <li>Agency (referred to as either "the Agency", "We", "Us" or "Our" in this Agreement) refers to Bulls v/s Bears (BvB, BvB365), managed solely by Vasudev Kittur, also known as Anurodh Kittur.</li>
                    <li>Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</li>
                    <li>Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                    <li>Personal Data is any information that relates to an identified or identifiable individual.</li>
                    <li>Service refers to the investment management services provided by Bulls v/s Bears.</li>
                    <li>Service Provider means any natural or legal person who processes the data on behalf of the Agency. It refers to third-party companies or individuals employed by the Agency to facilitate the Service, to provide the Service on behalf of the Agency, to perform services related to the Service or to assist the Agency in analyzing how the Service is used.</li>
                    <li>Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</li>
                    <li>Website refers to Bulls v/s Bears, accessible from our official website.</li>
                    <li>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                </ul>

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Collecting and Using Your Personal Data</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Types of Data Collected</h3>
                <br />

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Personal Data</h4>
                <br />
                <p>
                    While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Bank account information for investment purposes</li>
                    <li>Usage Data</li>
                </ul>

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Usage Data</h4>
                <br />
                <p>Usage Data is collected automatically when using the Service.</p>
                <br />

                <p>
                    Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
                <br />

                <p>
                    When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                </p>
                <br />

                <p>
                    We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                </p>
                <br />

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Tracking Technologies and Cookies</h4>
                <br />
                <p>
                    We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        <strong>Cookies or Browser Cookies:</strong>&nbsp;A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                    </li>
                    <li>
                        <strong>Web Beacons:</strong>&nbsp;Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Agency, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                    </li>
                </ul>

                <p>
                    Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.
                </p>
                <br />

                <p>We use both Session and Persistent Cookies for the purposes set out below:</p>
                <br />
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        <strong>Necessary / Essential Cookies</strong><br />
                        Type: Session Cookies<br />
                        Administered by: Us<br />
                        Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                    </li>
                    <li>
                        <strong>Cookies Policy / Notice Acceptance Cookies</strong><br />
                        Type: Persistent Cookies<br />
                        Administered by: Us<br />
                        Purpose: These Cookies identify if users have accepted the use of cookies on the Website.<br />
                    </li>
                    <li>
                        <strong>Functionality Cookies</strong><br />
                        Type: Persistent Cookies<br />
                        Administered by: Us<br />
                        Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                    </li>
                </ul>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Use of Your Personal Data</h3>
                <br />

                <p>The Agency may use Personal Data for the following purposes:</p>
                <br />

                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</li>
                    <li><strong>To manage Your Account</strong>: to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</li>
                    <li><strong>For the performance of an investment agreement</strong>: the development, compliance and undertaking of the investment agreement for the services You have contracted with Us.</li>
                    <li><strong>To contact You</strong>: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including important updates about your investments.</li>
                    <li><strong>To manage Your requests</strong>: To attend and manage Your requests to Us.</li>
                    <li><strong>For business transfers</strong>: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</li>
                    <li><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our investment strategies and to evaluate and improve our Service, products, services, and your experience.</li>
                </ul>

                <p>We may share Your personal information in the following situations:</p>
                <br />
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li><strong>With Service Providers</strong>: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                    <li><strong>For business transfers</strong>: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Agency assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                    <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
                    <li><strong>With financial institutions</strong>: We may share your information with financial institutions to facilitate transactions related to your investments.</li>
                </ul>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Retention of Your Personal Data</h3>
                <br />
                <p>
                    The Agency will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
                </p>
                <br />

                <p>
                    The Agency will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Transfer of Your Personal Data
                </h3>
                <br />

                <p>
                    Your information, including Personal Data, is processed at the Agency's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
                </p>
                <br />

                <p>
                    Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
                </p>
                <br />

                <p>
                    The Agency will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Delete Your Personal Data
                </h3>
                <br />

                <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
                <br />

                <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
                <br />

                <p>
                    You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
                </p>
                <br />

                <p>
                    Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Disclosure of Your Personal Data</h3>
                <br />

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Business Transactions</h4>
                <br />
                <p>
                    If the Agency is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                </p>
                <br />

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Law enforcement</h4>
                <p>
                    Under certain circumstances, the Agency may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                </p>
                <br />

                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Other legal requirements</h4>
                <br />
                <p>The Agency may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Comply with a legal obligation</li>
                    <li>Protect and defend the rights or property of the Agency</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                    <li>Protect the personal safety of Users of the Service or the public</li>
                    <li>Protect against legal liability</li>
                </ul>

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Security of Your Personal Data</h3>
                <br />

                <p>
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                </p>
                <br />

                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Important Disclaimers
                </h2>
                <br />

                <p>
                    Bulls v/s Bears is not SEBI certified and is not affiliated with any other organization. This should be understood by all clients before engaging our services.
                </p>
                <br />

                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Children's Privacy
                </h2>
                <br />

                <p>
                    Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, We take steps to remove that information from Our servers.
                </p>
                <br />

                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Links to Other Websites
                </h2>
                <br />

                <p>
                    Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
                </p>
                <br />

                <p>
                    We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                </p>
                <br />

                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Changes to this Privacy Policy
                </h2>
                <br />

                <p>
                    We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
                </p>
                <br />

                <p>
                    We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.
                </p>
                <br />

                <p>
                    You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
                <br />

                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Contact Us
                </h2>
                <br />

                <p>If you have any questions about this Privacy Policy, You can contact us:</p>
                <br />
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>By visiting our contact page: <Link href="/contact" className="cursor-pointer underline underline-offset-4">/contact</Link></li>
                </ul>
            </div>

            {/* Terms and Conditions Section */}
            <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Terms and Conditions</h1> {/* Added a main title */}
                <blockquote className="mt-6 border-l-2 pl-6 italic">Last updated: March 01, 2025</blockquote>
                <br />

                <p>
                    Please read these Terms and Conditions carefully before using the Service operated by Bulls v/s Bears.
                </p>
                <br />

                <p>
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
                <br />

                <p>
                    By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Interpretation and Definitions</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Interpretation</h3>
                <br />
                <p>
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Definitions</h3>
                <br />
                <p>For the purposes of these Terms and Conditions:</p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Agency means Bulls v/s Bears, also referred to as "BvB", "BvB365", "We", "Us" or "Our" in this Agreement.</li>
                    <li>Account means a unique account created for You to access our Service or parts of our Service.</li>
                    <li>Service refers to the investment management services provided by Bulls v/s Bears.</li>
                    <li>Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and Bulls v/s Bears regarding the use of the Service.</li>
                    <li>Website refers to Bulls v/s Bears, accessible from our official website.</li>
                    <li>You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
                    <li>Investment refers to the funds provided by You to Bulls v/s Bears for the purpose of trading and investment activities.</li>
                    <li>Risk Capital refers to 20% of your total investment that is allocated for active trading.</li>
                    <li>Secure Capital refers to 80% of your total investment that is kept protected.</li>
                </ul>

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Agency Information</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Management and Responsibility</h3>
                <br />
                <p>
                    Bulls v/s Bears is managed solely by an individual named Vasudev Kittur, also known as Anurodh Kittur. Any responsibility pertaining to the workings of this agency depends on him. We are not SEBI registered and are not affiliated with any other organization. You should invest your money wisely and understand the risks involved.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Investment Terms</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Investment Risk Disclosure</h3>
                <br />
                <p>
                    Investments are subject to market risk. You should be financially responsible and should invest amounts based on your own discretion and research. While we guarantee a minimum of 8% monthly returns on your total investment amount, all investments inherently carry some level of risk. Past performance is not indicative of future results.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Investment Lock-in Period</h3>
                <br />
                <p>
                    We recommend a lock-in period of 3 months from the date of investment to ensure optimal returns. After this 3-month period, you may withdraw your investment value as per your requirement. The current value will include your secure 80% plus any profits generated. If you need to withdraw before the 3-month period, you will only receive the 80% secure portion of your investment. The 20% risk capital will be retained as it is committed to ongoing trading activities.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Risk Allocation</h3>
                <br />
                <p>
                    Of the amount invested, 20% should be considered as risk capital that will be used for active trading including but not limited to Indian futures and options, Forex, and other similar instruments. This 20% will be used in perpetuity to generate profits. We guarantee that regardless of market conditions, your account will always maintain at least 80% of your original investment amount. We take full responsibility for ensuring this secure capital remains protected.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Returns and Commission</h3>
                <br />
                <p>
                    We guarantee a minimum of 8% profit per month calculated on your total investment amount. Our commission is 5% of the profits generated - not on your total investment. This means we only make money when you make money. In cases where we exceed the 8% monthly return, our 5% commission applies to the total profits generated.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Payment Methods</h3>
                <br />
                <p>
                    Payments will be made directly to Vasudev Kittur/Anurodh Kittur. In the future, we may implement direct payment methods through our website, at which time these Terms will be updated accordingly.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Accounts</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Account Eligibility</h3>
                <br />
                <p>
                    We maintain the right to reject any investment applications or terminate your account from our platform at our sole discretion. We may require verification of identity and other information before accepting investments.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Account Termination</h3>
                <br />
                <p>
                    If your account is terminated by us, the balance mapped to your account will be paid back to you within a reasonable time frame, usually within 30 business days, depending on market conditions and liquidity of investments.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Additional Services</h2>
                <br />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Live Trading Sessions</h3>
                <br />
                <p>
                    We offer live trading sessions via Google Meet where clients can observe our trading process and receive actionable trading opportunities. These sessions are available as a standalone service or as part of our coaching package.
                </p>
                <br />

                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Coaching Package</h3>
                <br />
                <p>
                    Our comprehensive coaching package includes educational materials and 3 months of free live trading sessions. This service is designed to teach you our trading methodologies and strategies.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Limitation of Liability</h2>
                <br />
                <p>
                    To the maximum extent permitted by applicable law, in no event shall Bulls v/s Bears, its managers, agents, or affiliates be liable for any indirect, punitive, incidental, special, consequential damages, or any damages whatsoever including, without limitation, damages for loss of use, data, or profits, arising out of or in any way connected with the use or performance of the Service.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Governing Law</h2>
                <br />
                <p>
                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <br />

                <p>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
                <br />

                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">Changes to Terms</h2>
                <br />
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <br />

                <p>
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
                <br />

                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                    Contact Us
                </h2>
                <br />
                <p>If you have any questions about these Terms, please contact us:</p>
                <br />
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>By visiting our contact page: <Link href="/contact" className="cursor-pointer underline underline-offset-4">/contact</Link></li>
                </ul>
            </div>
        </div>
    );
};

const HomePageComponent = () => {
    return (
        <>
            <section className="flex flex-col w-full lg:w-[95%] lg:flex-row items-center justify-center gap-16 mx-auto">
                <div className="flex flex-col justify-center text-center items-center lg:items-start lg:text-left w-full gap-8 lg:w-[45%]">

                    <h1 className="text-4xl/14 md:text-6xl/24 font-black">Invest once,<br /><span className="bg-chart-4 px-4 py-1 text-foreground dark:text-background">profit</span> always</h1>
                    <p className="text-lg md:text-2xl font-extralight">Earn upto <span className="font-bold">8% - 10%<span className="text-sm align-super">*</span></span> returns on your investments on a monthly basis
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-between">
                        <GlobalLink href="/contact" title="Contact us" additionalClasses="bg-foreground text-background hover:bg-foreground/90" />

                        <GlobalLink href="/login" title="Client dashboard" additionalClasses="outline outline-2" />
                    </div>
                    <p className="text-sm text-muted-foreground">* - All returns are subject to market conditions. Please read our legal agreement carefully before any financial dealings and invest wisely.</p>
                </div>
                <div className="flex-col items-center justify-center w-full hidden lg:flex lg:w-[55%]">
                    <Image src="bvb-hero.svg" alt="hero" width={900} height={500} />
                </div>
            </section>
        </>
    )
}

export { ContactPageComponent, AboutPageComponent, ServicesPageComponent, LegalPageComponent, HomePageComponent };