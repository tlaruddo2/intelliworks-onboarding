import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, FileText, BarChart2, Database, BrainCircuit, DollarSign, Mail, Phone, MapPin, Linkedin, Lightbulb, Dices } from 'lucide-react';

const AnimatedSection = ({ children, direction = 'right' }: { children: React.ReactNode; direction?: 'left' | 'right' | 'bottom' }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-100px)';
      case 'right': return 'translateX(100px)';
      case 'bottom': return 'translateY(100px)';
      default: return 'translateX(0)';
    }
  };

  return (
    <div
      ref={elementRef}
      className="transition-all duration-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
      }}
    >
      {children}
    </div>
  );
};

const EmailDialog = ({ language, setShowEmailDialog }: { language: string; setShowEmailDialog: (show: boolean) => void }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:intelliworks.team@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    setShowEmailDialog(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {language === 'en' ? 'Send Email' : '이메일 보내기'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Subject' : '제목'}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border bg-blue-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Message' : '메시지'}
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border bg-blue-50 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowEmailDialog(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {language === 'en' ? 'Cancel' : '취소'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {language === 'en' ? 'Send' : '보내기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const getOptimizedImageUrl = (url: string) => `${url}?auto=format&fit=crop&w=1920&h=1080&q=80`;

const OnboardingPage = () => {
  const [language, setLanguage] = useState('en');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const firstFeatureRef = useRef<HTMLElement>(null);

  const scrollToFirstFeature = () => {
    firstFeatureRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const content = {
    en: {
      productName: "IntelliWorks",
      headline: {
        line1: "Make Your Office Job Easier",
        line2: "and Go Home Earlier.",
        line3: "IntelliWorks is an AI-powered solution for small companies,",
        line4: "simplifying document to resource management",
      },
      contact: {
        email: "intelliworks.team@gmail.com",
        phone: "+1 7788633853",
        location: "Vancouver, B.C. Canada",
        linkedin: "https://www.linkedin.com/in/kukjinkim/"
      },
      sections: [
        {
          title: "Streamlined Features",
          subtitle: "Simple Yet Powerful",
          description: "Designed specifically for small businesses, our solution includes only the necessary features, avoiding the complexity of traditional ERP and MES systems.",
          icon: <BarChart2 className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40")
        },
        {
          title: "Cost-Effective",
          subtitle: "Affordable Excellence",
          description: "By eliminating unnecessary features, we offer a cost-effective solution tailored to the needs of small companies.",
          icon: <DollarSign className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c")
        },        
        {
          title: "Digital Inspection Records",
          subtitle: "Government-Compliant Storage",
          description: "Easily convert paper documents to digital format using OCR technology. Store and manage all government inspection records with instant search capability.",
          icon: <FileText className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1450101499163-c8848c66ca85")
        },
        {
          title: "Automated Collection",
          subtitle: "Real-time Data Integration",
          description: "Automatically collect data from various sources including PLC systems and third-party tools. Integrate with your existing software to ensure seamless data flow.",
          icon: <Database className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71")
        },
        {
          title: "AI-Driven Insights",
          subtitle: "Smart Manufacturing",
          description: "Analyze all collected data using AI to provide actionable insights. Receive notifications of potential issues and suggestions to optimize your processes.",
          icon: <BrainCircuit className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1551434678-e076c223a692")
        },
        {
          title: "Multi-Platform Access",
          subtitle: "Work from Anywhere",
          description: "Access your business data anytime, anywhere. Our solution works seamlessly across web browsers and mobile devices, keeping you connected on the go.",
          icon: <Dices className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1512486130939-2c4f79935e4f")
        }
      ]
    },
    ko: {
      productName: "인텔리웍스",
      headline: {
        line1: "업무는 더 쉽게,",
        line2: "퇴근은 더 빠르게",
        line3: "중소기업을 위한 AI 기반 솔루션,",
        line4: "문서와 데이터 관리를 간단하게",
      },
      contact: {
        email: "intelliworks.team@gmail.com",
        phone: "+1 7788633853",
        location: "밴쿠버, B.C. 캐나다",
        linkedin: "https://www.linkedin.com/in/kukjinkim/"
      },
      sections: [
        {
          title: "간소화된 기능",
          subtitle: "단순하지만 강력한",
          description: "소규모 기업을 위해 설계된 당사의 솔루션은 기존 ERP 및 MES 시스템의 복잡성을 피하고 필요한 기능만을 포함합니다.",
          icon: <BarChart2 className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40")
        },
        {
          title: "비용 효율적인 솔루션",
          subtitle: "합리적인 가격과 우수성",
          description: "불필요한 기능을 제거하여 중소기업의 요구에 맞춘 비용 효율적인 솔루션을 제공합니다.",
          icon: <DollarSign className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1554224155-8d04cb21cd6c")
        },        
        {
          title: "점검 기록 디지털화",
          subtitle: "정부 규정 준수 보관",
          description: "OCR 기술로 종이 문서를 쉽게 디지털화하고, 모든 정부 규제 필요 문서들을 즉시 검색 가능한 형태로 보관합니다.",
          icon: <FileText className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1450101499163-c8848c66ca85")
        },
        {
          title: "자동 데이터 수집",
          subtitle: "실시간 데이터 통합",
          description: "PLC 시스템과 타사 도구들로부터 데이터를 자동으로 수집합니다. 기존 사용 중인 소프트웨어와 통합하여 원활한 데이터 흐름을 보장합니다.",
          icon: <Database className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1551288049-bebda4e38f71")
        },
        {
          title: "AI 기반 인사이트",
          subtitle: "스마트 제조",
          description: "수집된 모든 데이터를 AI로 분석하여 실행 가능한 인사이트를 제공합니다. 잠재 문제에 대한 알림과 모든 프로세스 최적화를 위한 제안을 받으세요.",
          icon: <BrainCircuit className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1551434678-e076c223a692")
        },
        {
          title: "멀티플랫폼 지원",
          subtitle: "언제 어디서나 접속 가능",
          description: "웹 브라우저와 모바일 기기에서 완벽하게 작동하여 언제 어디서나 비즈니스 데이터에 접근할 수 있습니다.",
          icon: <Dices className="w-12 h-12 text-blue-600" />,
          image: getOptimizedImageUrl("https://images.unsplash.com/photo-1512486130939-2c4f79935e4f")
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold text-blue-600">
              {content[language as keyof typeof content].productName}
            </div>
            <button
              onClick={() => setLanguage(lang => lang === 'en' ? 'ko' : 'en')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {language === 'en' ? (
                <>
                  <img src="data:image/png;base64,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" alt="Korean Flag" className="w-6 h-4 object-cover rounded" />
                  <span>한국어</span>
                </>
              ) : (
                <>
                  <img src="data:image/png;base64,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" alt="Korean Flag" className="w-6 h-4 object-cover rounded" />
                  <span>English</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 w-full">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white w-full">
          <AnimatedSection direction="bottom">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight mb-6">
                <div className='mb-4'>{content[language as keyof typeof content].headline.line1}</div>
                <div className="mt-2">{content[language as keyof typeof content].headline.line2}</div>
              </h1>
              <h3 className="text-1xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-tight">
                <div className='mb-2'>{content[language as keyof typeof content].headline.line3}</div>
                <div className="mt-1">{content[language as keyof typeof content].headline.line4}</div>
              </h3>              
              <ChevronDown 
                className="w-8 h-8 text-blue-600 mx-auto mt-20 animate-bounce cursor-pointer hover:text-blue-700 transition-colors" 
                onClick={scrollToFirstFeature}
              />
            </div>
          </AnimatedSection>
        </section>

        {/* Feature Sections */}
        {content[language as keyof typeof content].sections.map((section, index) => (
          <section
            ref={index === 0 ? firstFeatureRef : undefined}
            key={index}
            className={`min-h-screen flex items-center justify-center py-20 w-full ${
              index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="container mx-auto px-4">
              <div className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-12 max-w-7xl mx-auto`}>
                <AnimatedSection direction={index % 2 === 0 ? 'left' : 'right'}>
                  <div className="flex-1">
                    <div className="max-w-xl">
                      {section.icon}
                      <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
                        {section.title}
                      </h2>
                      <h3 className="text-xl text-blue-600 mb-4">
                        {section.subtitle}
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
                <AnimatedSection direction={index % 2 === 0 ? 'right' : 'left'}>
                  <div className="flex-1 max-w-2xl">
                    <div className="aspect-video bg-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        ))}

        {/* After Feature Sections, before Footer */}
        <section className="py-20 w-full bg-blue-50">
          <div className="container mx-auto px-4">
            <AnimatedSection direction="bottom">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {language === 'en' ? 'Contact Us' : '문의하기'}
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  {language === 'en' 
                    ? "Have questions? We'd love to hear from you."
                    : "궁금하신 점이 있으신가요? 언제든 문의해 주세요."}
                </p>
                <button
                    onClick={() => setShowEmailDialog(true)}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold"
                >
                  <Mail className="w-5 h-5" />
                  {language === 'en' ? 'Send us an email' : '이메일 보내기'}
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 w-full">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold mb-8">
                  {content[language as keyof typeof content].productName}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    <a href={`mailto:${content[language as keyof typeof content].contact.email}`} className="hover:text-blue-400 transition-colors">
                      {content[language as keyof typeof content].contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${content[language as keyof typeof content].contact.phone}`} className="hover:text-blue-400 transition-colors">
                      {content[language as keyof typeof content].contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    <span>{content[language as keyof typeof content].contact.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5" />
                    <a 
                      href={content[language as keyof typeof content].contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {showEmailDialog && <EmailDialog language={language} setShowEmailDialog={setShowEmailDialog} />}
    </div>
  );
};

export default OnboardingPage;