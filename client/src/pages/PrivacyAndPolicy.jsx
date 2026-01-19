"use client"

import { useState } from "react"
import { Mail, Phone, Clock, MapPin } from "lucide-react"

export default function PrivacyPolicy() {
  const [language, setLanguage] = useState("english")

  const content = {
    english: {
      title: "Privacy Policy",
      
      company: "Company: Baytal Protein Trading LLC",
      sections: {
        introduction: {
          title: "Introduction",
          content: `Welcome to Baytal Protein, your trusted source for health and fitness products. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of your information through our website https://baytalprotein.net/ (the “Site”). By accessing or using the Site, you agree to the terms of this Privacy Policy.`,
        },
        dataCollection: {
          title: " Information We Collect",
          points: [
            "Personal Information: Your name, address, email address, telephone number, and payment information that you provide when you make a purchase, create an account, or interact with our services.",
            "Usage Data: Information about how you access and use our Site, such as the types of products you browse or search for, your interaction with our advertisements, and information from cookies and similar technologies.",
            "Device Information: Information about the device you use to access our Site, including hardware model, operating system, unique device identifiers, and mobile network information.",
          ],
        },
        cookies: {
          title: "How We Use Your Information",
          points: [
            "To process and fulfill your orders and requests for products and services.",
            "To communicate with you about your account or transactions and send you information about features and enhancements on our Site.",
            "To provide personalized content and product recommendations.",
            "To improve and optimize the performance and accuracy of our Site and services.",
            "For marketing and promotional purposes, where you have agreed to receive such communications.",
          ],
        },
        rights: {
          title: " Information Sharing and Disclosure",
          points: [
            "We do not sell or rent your personal information to third parties. We may share your information with:",
            "Service Providers: Third parties who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.",
            "Legal Requirements: If required by law or if we believe that such action is necessary to comply with legal processes, we may disclose your information.",
            "Business Transfers: In connection with any merger, sale of company assets, or acquisition, we may transfer your personal information.",
          ],
        },
        security: {
          title: " Your Data Protection Rights",
          content:[
            "You have the following data protection rights:",
            "The right to access, update, or delete the information we have on you.",
            "The right to opt-out of marketing communications we send you at any time.",
            "The right to complain to a data protection authority about our collection and use of your personal information.",
            ]
        },
        changes: {
          title: "Cookies and Similar Technologies",
          content:
            "We use cookies and similar tracking technologies to track activity on our Site and store certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent..",
        },
         changes: {
          title: "Security",
          content:
            "We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction..",
        },

         changes: {
          title: " Changes to This Privacy Policy",
          content:
            "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
        },


        changes: {
          title: "Contact Us",
          content:
            "If you have any questions about this Privacy Policy, please contact us at info@baytalprotein.net.",
        },
        // contact: {
        //   title: "Contact Information",
        //   details: {
        //     website: "Grabatoz.ae",
        //     poweredBy: "Powered by Crown Excel General Trading LLC",
        //     poBox: "P.O. Box No: 241975, Dubai, UAE",
        //     customerService: "Customer Service:",
        //     phone: "Tel: +971 4 354 0566",
        //     email: "Email: customercare@grabatoz.ae",
        //     hours: "Customer service hours: Daily from 9:00 AM to 7:00 PM",
        //   },
        // },
      },
    },
    arabic: {
      title: "سياسة الخصوصية",
      effectiveDate: "",
      company: "الشركة: Baytal Protein Trading LLC",
      sections: {
        introduction: {
          title: "مقدمة",
          content: `مرحبًا بكم في بيتال بروتين، مصدركم الموثوق لمنتجات الصحة واللياقة. توضح سياسة الخصوصية هذه ممارساتنا المتعلقة بجمع معلوماتكم واستخدامها والإفصاح عنها عبر موقعنا الإلكتروني https://baytalprotein.net/ (\"الموقع\"). بدخولكم إلى الموقع أو استخدامه فإنكم توافقون على شروط هذه السياسة.`,
        },
        dataCollection: {
          title: "المعلومات التي نجمعها",
          points: [
            "المعلومات الشخصية: اسمك، عنوانك، بريدك الإلكتروني، رقم هاتفك، ومعلومات الدفع التي تقدّمها عند إجراء عملية شراء أو إنشاء حساب أو التفاعل مع خدماتنا.",
            "بيانات الاستخدام: معلومات حول كيفية دخولك للموقع واستخدامه، مثل أنواع المنتجات التي تتصفحها أو تبحث عنها، وتفاعلك مع إعلاناتنا، والمعلومات المجمَّعة عبر ملفات تعريف الارتباط والتقنيات المماثلة.",
            "معلومات الجهاز: معلومات عن الجهاز الذي تستخدمه للوصول إلى موقعنا، بما في ذلك طراز العتاد، ونظام التشغيل، ومعرّفات الأجهزة الفريدة، ومعلومات شبكة الهاتف المحمول.",
          ],
        },
        cookies: {
          title: "كيفية استخدامنا لمعلوماتك",
          points: [
            "لمعالجة طلباتكم والوفاء بها، وتلبية طلبات المنتجات والخدمات.",
            "للتواصل معكم بخصوص حسابكم أو معاملاتكم، وإرسال معلومات عن الميزات والتحسينات على موقعنا.",
            "لتقديم محتوى مخصص وتوصيات للمنتجات.",
            "لتحسين أداء موقعنا وخدماتنا ورفع كفاءتها ودقتها.",
            "لأغراض التسويق والترويج، عندما توافقون على تلقي مثل هذه الاتصالات.",
          ],
        },
        rights: {
          title: "مشاركة المعلومات والإفصاح عنها",
          points: [
            "نحن لا نبيع أو نؤجر معلوماتكم الشخصية لأطراف ثالثة. قد نشارك معلوماتكم مع:",
            "مقدّمي الخدمات: أطراف ثالثة تؤدي خدمات نيابة عنا مثل معالجة المدفوعات، وتحليل البيانات، وإرسال البريد الإلكتروني، وخدمات الاستضافة، ودعم العملاء.",
            "المتطلبات القانونية: إذا طُلب منا بموجب القانون أو إذا رأينا أن ذلك ضروري للامتثال للإجراءات القانونية، قد نُفصح عن معلوماتكم.",
            "التحويلات التجارية: في سياق أي اندماج أو بيع لأصول الشركة أو عملية استحواذ، قد ننقل معلوماتكم الشخصية.",
          ],
        },
        security: {
          title: "حقوقكم في حماية البيانات",
          content: [
            "لديكم الحقوق التالية المتعلقة بحماية بياناتكم:",
            "الحق في الوصول إلى المعلومات التي نحتفظ بها عنكم وتحديثها أو حذفها.",
            "الحق في إلغاء الاشتراك في الاتصالات التسويقية التي نرسلها لكم في أي وقت.",
            "الحق في تقديم شكوى إلى جهة حماية البيانات بشأن جمع معلوماتكم الشخصية واستخدامها من قبلنا.",
          ],
        },
        changes: {
          title: "اتصل بنا",
          content:
            "لأي أسئلة بخصوص سياسة الخصوصية هذه، يُرجى التواصل معنا عبر البريد الإلكتروني: info@baytalprotein.net.",
        },
      },
    },
  }

  const currentContent = content[language]
  const isArabic = language === "arabic"

  return (
    <div className={`min-h-screen bg-white py-8 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Two-column layout: English (left), Arabic (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* English Column (Left) */}
          <div className="bg-white">
            <div className="p-8 ltr">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.english.title}</h1>
                <p className="text-gray-600 mb-2">{content.english.effectiveDate}</p>
                <p className="text-gray-700 font-medium">{content.english.company}</p>
              </div>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.english.sections.introduction.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.english.sections.introduction.content}</p>
              </section>

              {/* Data Collection and Usage */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.english.sections.dataCollection.title}
                </h2>
                <ul className="space-y-3">
                  {content.english.sections.dataCollection.points.map((point, index) => {
                    const colonIndex = typeof point === "string" ? point.indexOf(":") : -1
                    const contentNode =
                      colonIndex > -1 ? (
                        <>
                          <strong>{point.slice(0, colonIndex)}:</strong>
                          {point.slice(colonIndex + 1)}
                        </>
                      ) : (
                        point
                      )
                    return (
                      <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                        <span className="inline-block w-2 h-2 bg-[#d9a82e] rounded-full mt-2 mr-3 ml-1 flex-shrink-0"></span>
                        <span>{contentNode}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>

              {/* Cookies and Tracking Technologies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.english.sections.cookies.title}
                </h2>
                <ul className="space-y-3">
                  {content.english.sections.cookies.points.map((point, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#d9a82e] rounded-full mt-2 mr-3 ml-1 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.english.sections.rights.title}
                </h2>
                <ul className="space-y-3">
                  {content.english.sections.rights.points.map((point, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#d9a82e] rounded-full mt-2 mr-3 ml-1 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.english.sections.security.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.english.sections.security.content}</p>
              </section>

              {/* Changes to This Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.english.sections.changes.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.english.sections.changes.content}</p>
              </section>
            </div>
          </div>

          {/* Arabic Column (Right) */}
          <div className="bg-white">
            <div className="p-8 rtl">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.arabic.title}</h1>
                <p className="text-gray-600 mb-2">{content.arabic.effectiveDate}</p>
                <p className="text-gray-700 font-medium">{content.arabic.company}</p>
              </div>

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.arabic.sections.introduction.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.arabic.sections.introduction.content}</p>
              </section>

              {/* Data Collection and Usage */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.arabic.sections.dataCollection.title}
                </h2>
                <ul className="space-y-3">
                  {content.arabic.sections.dataCollection.points.map((point, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#d9a82e] rounded-full mt-2 mr-3 ml-1 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Cookies and Tracking Technologies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.arabic.sections.cookies.title}
                </h2>
                <ul className="space-y-3">
                  {content.arabic.sections.cookies.points.map((point, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#d9a82e] rounded-full mt-2 mr-3 ml-1 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.arabic.sections.rights.title}
                </h2>
                <ul className="space-y-3">
                  {content.arabic.sections.rights.points.map((point, index) => (
                    <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#d9a82e] rounded-full mt-2 mr-3 ml-1 flex-shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.arabic.sections.security.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.arabic.sections.security.content}</p>
              </section>

              {/* Changes to This Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-[#d9a82e] pb-2">
                  {content.arabic.sections.changes.title}
                </h2>
                <p className="text-gray-700 leading-relaxed">{content.arabic.sections.changes.content}</p>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      {/* <section className="bg-gray-50 text-black p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
            <p className="text-black">Get in touch with our team for any questions or concerns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Phone className="w-5 h-5 text-lime-500" />
              </div>
              <h3 className="font-medium mb-1">Phone</h3>
              <a href="tel:+97143540566" className="text-black">
                +971 4 354 0566
              </a>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Mail className="w-5 h-5 text-lime-500" />
              </div>
              <h3 className="font-medium mb-1">Email</h3>
              <a href="mailto:customercare@grabatoz.ae" className="text-black">
                customercare@grabatoz.ae
              </a>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-5 h-5 text-lime-500" />
              </div>
              <h3 className="font-medium mb-1">Hours</h3>
              <p className="text-black">Daily 9:00 AM - 7:00 PM</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <MapPin className="w-5 h-5 text-lime-500" />
              </div>
              <h3 className="font-medium mb-1">Address</h3>
              <p className="text-black">P.O. Box 241975, Dubai, UAE</p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-gray-700">
            <p className="text-black">
              <strong>Grabatoz.ae</strong><br />
              <b>Powered by Crown Excel General Trading LLC</b>
            </p>
          </div>
        </div>
      </section> */}
    </div>
  )
}
