"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "Software Engineering Student @ UTT · GPA 3.64",
    "hero.title1": "Engineering Intelligent",
    "hero.title2": "AI Systems & Architectures",
    "hero.sub": "Engineering Graph-RAG architectures & high-performance backend systems at UTT Hanoi.",
    "hero.viewProjects": "Selected Works",
    "hero.contactMe": "Get in Touch",

    // Stats
    "stats.gpa": "Academic GPA",
    "stats.gpaSub": "UTT · Excellent Standing",
    "stats.hackathon": "AI Hackathon",
    "stats.hackathonSub": "K-Tech & LIKELION 2026",
    "stats.award": "AI for Social Challenge",
    "stats.awardSub": "Team Leader · Award Winner",
    "stats.experience": "Work Experience",
    "stats.experienceSub": "Operations & Coaching",

    // About
    "about.headerTag": "ABOUT MY ENGINEERING PATH",
    "about.headerTitle": "About my engineering path",
    "about.headerSub": "Student developer at UTT (GPA 3.64 / 4.00). 3rd Place Team Leader at AI for Social Challenge & Hackathon Top 6 Finalist.",
    "about.cardTitle": "Background & Perspective",
    "about.bio1": "I am a Software Engineering student at the University of Transport Technology (UTT), maintaining an Excellent academic standing with a 3.64 / 4.00 GPA. Driven by logic and a proactive mindset, I engineer AI pipelines and high-performance backend systems.",
    "about.bio2": "As an active AI researcher and team leader, I led my team to win 3rd Place in the AI for Social Challenge with EduGuide AI, and reached Top 6 in Hackathon: AI for Everyday Life (LIKELION / K-Tech College 2026).",
    "about.bio3": "I am actively pursuing academic and research opportunities at the Korea National University of Transportation (KNUT) to expand my global research perspective.",
    "about.techStack": "Categorized Technical Arsenal",
    "about.languages": "Language Proficiency",
    "lang.vi": "Vietnamese",
    "lang.viLevel": "Native Proficiency",
    "lang.en": "English",
    "lang.enLevel": "Professional Working",
    "lang.kr": "Korean",
    "lang.krLevel": "TOPIK Preparation",

    // Projects
    "projects.tag": "FEATURED DISCOVERIES & ARCHITECTURES",
    "projects.title": "Selected Innovations",
    "projects.subtitle": "Click any project card to expand full system architecture specs and live demos.",
    "projects.tapDetails": "Tap for details",
    "projects.viewSystem": "VIEW SYSTEM →",
    "projects.liveDemo": "Live System Demo",
    "projects.sourceCode": "Source Code",
    "projects.archTab": "INTERACTIVE ARCHITECTURE",
    "projects.overviewTab": "SYSTEM OVERVIEW",
    "projects.sandboxTab": "LIVE API SANDBOX",
    "projects.propCode": "Confidential Proprietary Code",

    // Experience
    "exp.tag": "ACADEMIC & PROFESSIONAL HISTORY",
    "exp.title": "Experience & Background",
    "exp.sub": "Chronological timeline of academic research, competitive hackathons, and operational leadership.",
    "exp.viewCert": "View Certificate",

    // Contact
    "contact.tag": "COMMUNICATION NODE",
    "contact.title": "Let's Build Something Extraordinary",
    "contact.sub": "Available for AI Engineering, Backend Development, and Global Research Opportunities.",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Transmission",
    "contact.status": "Available for New Opportunities",
  },
  vi: {
    // Nav
    "nav.about": "Về tôi",
    "nav.projects": "Dự án",
    "nav.experience": "Kinh nghiệm",
    "nav.contact": "Liên hệ",

    // Hero
    "hero.badge": "Sinh viên Kỹ thuật Phần mềm @ UTT · GPA 3.64",
    "hero.title1": "Phát triển Hệ thống",
    "hero.title2": "Trí tuệ Nhân tạo & Kiến trúc Backend",
    "hero.sub": "Xây dựng kiến trúc Graph-RAG & hệ thống backend hiệu năng cao tại UTT Hà Nội.",
    "hero.viewProjects": "Dự án Chọn lọc",
    "hero.contactMe": "Liên hệ Ngay",

    // Stats
    "stats.gpa": "Điểm GPA Tích lũy",
    "stats.gpaSub": "UTT · Xếp loại Xuất sắc",
    "stats.hackathon": "AI Hackathon",
    "stats.hackathonSub": "K-Tech & LIKELION 2026",
    "stats.award": "AI for Social Challenge",
    "stats.awardSub": "Trưởng nhóm · Đạt giải Ba",
    "stats.experience": "Kinh nghiệm Làm việc",
    "stats.experienceSub": "Quản lý & Huấn luyện",

    // About
    "about.headerTag": "HÀNH TRÌNH KỸ THUẬT PHẦN MỀM",
    "about.headerTitle": "Hành trình kỹ thuật & nghiên cứu",
    "about.headerSub": "Sinh viên Lập trình UTT (GPA 3.64 / 4.00). Trưởng nhóm đạt Giải Ba AI for Social Challenge & Top 6 Hackathon Toàn quốc.",
    "about.cardTitle": "Nền tảng & Định hướng Kỹ thuật",
    "about.bio1": "Tôi là sinh viên ngành Kỹ thuật Phần mềm tại Trường Đại học Công nghệ Giao thông Vận tải (UTT), duy trì học lực Xuất sắc với GPA 3.64 / 4.00. Với tư duy logic và chủ động, tôi chuyên thiết kế các quy trình AI tiên tiến và hệ thống backend hiệu năng cao.",
    "about.bio2": "Với vai trò Trưởng nhóm nghiên cứu AI, tôi đã dẫn dắt đội đạt Giải Ba cuộc thi AI for Social Challenge với hệ thống EduGuide AI, và đạt Top 6 Hackathon toàn quốc: AI for Everyday Life (LIKELION / K-Tech College 2026).",
    "about.bio3": "Tôi đang tích cực chuẩn bị hồ sơ du học và nghiên cứu tại Đại học Quốc gia Giao thông Hàn Quốc (KNUT) để mở rộng tầm nhìn công nghệ toàn cầu.",
    "about.techStack": "Kho Vũ khí Công nghệ Phân loại",
    "about.languages": "Năng lực Ngôn ngữ",
    "lang.vi": "Tiếng Việt",
    "lang.viLevel": "Tiếng mẹ đẻ",
    "lang.en": "Tiếng Anh",
    "lang.enLevel": "Thành thạo công việc",
    "lang.kr": "Tiếng Hàn",
    "lang.krLevel": "Đang luyện thi TOPIK",

    // Projects
    "projects.tag": "DỰ ÁN NỔI BẬT & KIẾN TRÚC HỆ THỐNG",
    "projects.title": "Dự án Sáng tạo Chọn lọc",
    "projects.subtitle": "Nhấp vào bất kỳ thẻ dự án nào để xem chi tiết sơ đồ kiến trúc hệ thống và bản demo trực tiếp.",
    "projects.tapDetails": "Chạm để xem chi tiết",
    "projects.viewSystem": "XEM KIẾN TRÚC →",
    "projects.liveDemo": "Demo Trực tiếp",
    "projects.sourceCode": "Mã nguồn GitHub",
    "projects.archTab": "SƠ ĐỒ KIẾN TRÚC TƯƠNG TÁC",
    "projects.overviewTab": "TỔNG QUAN HỆ THỐNG",
    "projects.sandboxTab": "THỬ NGHIỆM API LIVE",
    "projects.propCode": "Mã nguồn Bảo mật Độc quyền",

    // Experience
    "exp.tag": "LỊCH SỬ HỌC TẬP & HOẠT ĐỘNG",
    "exp.title": "Kinh nghiệm & Thành tựu",
    "exp.sub": "Dòng thời gian nghiên cứu học thuật, các cuộc thi Hackathon và năng lực lãnh đạo.",
    "exp.viewCert": "Xem Chứng nhận",

    // Contact
    "contact.tag": "KÊNH KẾT NỐI LIÊN HỆ",
    "contact.title": "Cùng tạo nên những sản phẩm đột phá",
    "contact.sub": "Sẵn sàng cho các cơ hội hợp tác Kỹ sư AI, Lập trình Backend và Nghiên cứu Quốc tế.",
    "contact.name": "Họ và tên",
    "contact.email": "Địa chỉ Email",
    "contact.message": "Nội dung tin nhắn",
    "contact.send": "Gửi Tin Nhắn",
    "contact.status": "Sẵn sàng đón nhận cơ hội mới",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language
    if (saved && (saved === "en" || saved === "vi")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("portfolio_lang", lang)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "vi" : "en")
  }

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
