# Portfolio Build Log & Tech Stack

Tài liệu này ghi lại toàn bộ các thư viện, công cụ và quy trình từng bước xây dựng nên website portfolio cá nhân của **Nguyễn Thành Duy**.

---

## 🛠️ Công cụ & Thư viện chính (Tech Stack)

### 1. Core Framework & Languages
*   **Next.js 16 (App Router):** Xương sống của ứng dụng, hỗ trợ React Server Components (RSC) mặc định và tối ưu hóa tải trang.
*   **TypeScript:** Đảm bảo chặt chẽ kiểu dữ liệu (type-safe) và giảm thiểu lỗi runtime trong quá trình phát triển.
*   **React 19:** Thư viện giao diện người dùng cốt lõi.

### 2. Styling & Layout
*   **Tailwind CSS v4:** Công cụ dựng style chính nhanh và tối giản.
*   **Vanilla CSS (`globals.css`):** Định nghĩa hệ màu sắc thương hiệu Burnt Orange (`#D97757`), các cấu hình ánh sáng nền (ambient glows), texture hạt nhiễu (premium grain) và cấu hình con trỏ chuột.

### 3. Hiệu ứng động & 3D (Animations & 3D WebGL)
*   **Three.js / React Three Fiber (`@react-three/fiber`):** Thư viện dựng môi trường WebGL 3D trực tiếp trong React.
*   **React Three Drei (`@react-three/drei`):** Các thành phần bổ trợ tiện ích cho R3F (như float animation, load helper).
*   **Framer Motion (`framer-motion`):** Quản lý hiệu ứng chuyển động vi mô (micro-interactions), hiệu ứng trượt mở trang (Preloader exit) và hiệu ứng mask reveal cho tiêu đề.
*   **React Parallax Tilt (`react-parallax-tilt`):** Tạo hiệu ứng nghiêng 3D tương tác khi di chuột qua các thẻ dự án (Projects).
*   **Lenis (`lenis`):** Quản lý cuộn trang mượt mà (smooth scrolling) đồng bộ xuyên suốt website.

### 4. Media & Icons
*   **Simple Icons CDN:** Nguồn cấp SVG logos nguyên bản cho thanh chuyển động công nghệ (Tech Strip) có khả năng hover chuyển màu.
*   **Lucide React:** Bộ icon giao diện tối giản đồng nhất.
*   **SVG Custom Icons:** Thành phần icon thủ công cho các brand đặc thù (như GitHub Icon) tránh lỗi thiếu thư viện.

---

## 🚀 Quy trình xây dựng từng bước (Step-by-Step)

### Bước 1: Khởi tạo dự án & Cấu hình môi trường
*   Setup khung mã nguồn Next.js 16, TypeScript và cài đặt bộ thư viện động (`framer-motion`, `gsap`, `lenis`, `three`, `react-parallax-tilt`).

### Bước 2: Thiết lập hệ thống thiết kế (Design System & Theme)
*   Cấu hình `globals.css` thiết lập màu nền chủ đạo tối (`#0c0c0c` / `#141414`), màu nhấn cam cháy Burnt Orange (`#D97757`) đồng bộ toàn trang.
*   Thêm lớp phủ hạt nhiễu tĩnh (`grain texture overlay`) cố định màn hình để tạo cảm giác cao cấp.
*   Thêm hiệu ứng phản hồi vật lý nén lực (`scale(0.97)`) khi click chuột vào nút tương tác.

### Bước 3: Tạo bộ cuốn mượt (Smooth Scroll) & Con trỏ chuột nghệ thuật
*   Xây dựng `LenisProvider` để tạo chuyển động trượt mượt mà khi cuộn trang, tự động ngắt trên các thiết bị bật chế độ giảm hoạt ảnh (`prefers-reduced-motion`).
*   Xây dựng `CustomCursor` kết hợp chấm tròn và vòng trễ lò xo (spring ring) có thuộc tính `mix-blend-difference` (tự động đảo màu sắc âm bản trên nền sáng/tối), ẩn trên các thiết bị màn hình cảm ứng.

### Bước 4: Thiết kế tiêu đề trượt (Cinematic Text Reveal)
*   Bao bọc các tiêu đề các phần chính (About, Selected Work, Background, Contact) trong thẻ `overflow-hidden` và điều hướng di chuyển dịch chuyển tịnh tiến từ dưới lên thông qua Framer Motion để tạo hiệu ứng xuất hiện điện ảnh.

### Bước 5: Phát triển dải công nghệ chuyển động vô tận (Tech Strip Marquee)
*   Xây dựng dải marquee tự động cuộn vô tận chứa 14 logo công nghệ từ CDN Simple Icons, thiết kế hiệu ứng hover phát màu gốc của từng công nghệ giúp giao diện sinh động nhưng gọn gàng.

### Bước 6: Xây dựng lưới dự án không đối xứng (Bento Grid Projects)
*   Tái cấu trúc giao diện danh sách dự án thành dạng Bento Grid 3 ngăn tỉ lệ 7:5:
    *   **Thẻ to (EduGuide AI):** Đầy đủ mô tả chi tiết, hình ảnh minh họa lớn, nút Live/Source và huy chương giải thưởng nổi bật.
    *   **Thẻ nhỏ (TOPIK Master):** Dạng dọc thu gọn kèm nút Live trực diện.
    *   **Thẻ "What I do":** Khung tóm tắt năng lực cốt lõi và khu vực sẵn sàng tuyển dụng.
*   Bọc các thẻ dự án trong trình nghiêng `Tilt` của `react-parallax-tilt` (không bật chói kim loại) giúp thẻ phản hồi sống động theo chuyển động chuột.

### Bước 7: Thiết kế phông nền không gian 3D Lập trình viên (3D Coder Background)
*   Sử dụng Canvas WebGL dựng mô hình bàn làm việc lập trình viên gồm:
    *   Màn hình PC hiển thị dòng code ma trận cuộn thực tế vẽ trên thẻ HTML5 Canvas động.
    *   Bàn phím phát sáng cam neon.
    *   Nhân vật lập trình dạng lưới phát sáng đang gõ phím liên tục ( typing hand loop animation).
    *   Đám mây hạt bụi code xoay chậm xung quanh.
*   Đặt Canvas cố định phía dưới (`-z-20`) toàn bộ layout chính và làm mờ (`opacity-[0.12]`) để tránh cản trở việc đọc thông tin.

### Bước 8: Hoàn thiện Dòng thời gian (Experience Timeline) & Liên hệ (Contact)
*   Sắp xếp lại dòng thời gian lịch sử hoạt động logic từ dưới lên: Academic (UTT) -> Huấn luyện viên cầu lông -> Tư vấn doanh nghiệp -> Chuỗi 2 nhà hàng Golden Gate.
*   Tối ưu hóa độ tương phản biểu mẫu liên hệ, nâng cấp nền các ô nhập liệu lên dạng đặc hơn (`bg-card/85`) để chống mờ chữ khi đè lên phông nền 3D.

### Bước 9: Commit & Đẩy lên Vercel Production
*   Commit toàn bộ source code sạch lỗi phân nhánh chính và push lên GitHub.
*   Kết nối và triển khai build tự động thành công thông qua Vercel CLI lên tên miền chính thức: **[duynguyenthanh.vercel.app](https://duynguyenthanh.vercel.app)**.
