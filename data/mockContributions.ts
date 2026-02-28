// Mock Data cho trang CHIA SẺ & CẢM NGỘ
// File này chứa dữ liệu mẫu để triển khai trang Contributions Feed

export interface Contribution {
  id: number;
  type: 'video' | 'story' | 'feedback'; // A, B, C

  // Chung
  category: string;
  title?: string;
  author: string;
  country: string;
  date: string; // "25/02/2026"
  excerpt: string;

  // Loại A: Video
  videoThumbnail?: string;
  videoUrl?: string;
  videoDuration?: string;
  rating?: number; // 1-5 stars
  viewCount?: number;
  commentCount?: number;

  // Loại B: Photo & Story
  coverImage?: string;
  fullContent?: string;
  likeCount?: number;

  // Loại C: Feedback
  quote?: string;
  tags?: string[];

  // Full story details (for modal)
  fullStory?: {
    problem?: string;
    solution?: string;
    result?: string;
    timeframe?: string;
  };
}

export const mockContributions: Contribution[] = [
  // ============= LOẠI A: VIDEO =============
  {
    id: 1,
    type: 'video',
    category: 'Sức Khỏe',
    title: 'Từ Ung Thư Giai Đoạn Sang BÌNH THƯỜNG',
    author: 'Chị Mieko Kawamata',
    country: 'Nhật Bản',
    date: '25/02/2026',
    excerpt: 'Được chẩn đoán ung thư vú ở tuổi 39. Hoàn toàn tuyệt vọng. Nhưng sau 1 tháng niệm kinh + phóng sinh 2000 con cá, xét nghiệm lại kết quả bình thường!',
    videoThumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '15:30',
    rating: 5,
    viewCount: 2500,
    commentCount: 124,
    fullStory: {
      problem: 'Được chẩn đoán ung thư vú ở tuổi 39. Bác sĩ nói tỷ lệ sống sót rất thấp. Gia đình tuyệt vọng.',
      solution: 'Phóng sinh 2000 con cá, niệm Lễ Phật Đại Sám Hối Văn hàng ngày, ăn chay, phát nguyện ăn chay 20 ngày/tháng.',
      result: 'Sau 1 tháng xét nghiệm lại, kết quả bình thường. Bác sĩ gọi đó là phép mầu. Nhiều người thân cũng bắt đầu tu học.',
      timeframe: '1 tháng',
    },
  },

  {
    id: 2,
    type: 'video',
    category: 'Sự Nghiệp',
    title: 'Từ BẤT CẤP Sang CÓ ĐỀ CỬ NGỦ Công Ty Lớn',
    author: 'Chị Crystal Huang',
    country: 'Hoa Kỳ',
    date: '24/02/2026',
    excerpt: 'Muốn chuyển nghề từ tài chính sang giáo dục nhưng thị trường việc làm rất khó khăn. Ngay hôm sau sám hối, nhận được lời mời phỏng vấn!',
    videoThumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '12:45',
    rating: 5,
    viewCount: 1800,
    commentCount: 89,
    fullStory: {
      problem: 'Muốn chuyển nghề từ tài chính sang giáo dục nhưng thị trường việc làm rất khó khăn.',
      solution: 'Niệm Lễ Phật Đại Sám Hối Văn, phóng sinh, sám hối nghiệp chướng cản trở sự nghiệp.',
      result: 'Ngay ngày hôm sau nhận được lời mời phỏng vấn và tìm được công việc mơ ước trong ngành giáo dục.',
      timeframe: '48 giờ',
    },
  },

  // ============= LOẠI B: STORY =============
  {
    id: 3,
    type: 'story',
    category: 'Hôn Nhân',
    title: 'VỢ CHỒNG Từ MâuThuẫn Sang HÒA HỢP Trở Lại',
    author: 'Chị Ngọc Hà',
    country: 'Việt Nam',
    date: '23/02/2026',
    excerpt: 'Vợ chồng mâu thuẫn liên tục, suýt ly hôn. Chồng say xỉn thường xuyên. Sau khi niệm 108 biến Giải Kết Chú mỗi ngày cho chồng, chồng tự bỏ rượu...',
    coverImage: 'https://images.unsplash.com/photo-1552767021-48461239c7fa?w=600&h=400&fit=crop',
    fullContent: `
      <h3>Câu Chuyện Hạnh Phúc Của Chị Ngọc Hà</h3>
      <p>Tôi vốn là một người phụ nữ may mắn với một gia đình ấm áp. Nhưng sau 5 năm kết hôn, mọi thứ thay đổi. Chồng tôi lọt vào con đường sa ngã - rượu là bạn thân mỗi ngày.</p>
      <p>Những cuộc cãi vã trở nên thường xuyên. Lần nào cũng khiến trẻ con khóc. Tôi nhiều lần suy nghĩ về ly hôn, cảm thấy tuyệt vọng.</p>
      <h4>Gặp Pháp Môn Tâm Linh</h4>
      <p>Âu yếm của mẹ tôi, tôi được tiếp xúc với Pháp Môn Tâm Linh. Ban đầu tôi không tin, nhưng sự chân thành của mẹ đã thuyết phục tôi thử.</p>
      <p>Sư Phụ hướng dẫn tôi niệm 108 biến Giải Kết Chú mỗi ngày cho chồng, phóng sinh 200 con cá, phát nguyện ăn chay. Tôi làm rất chuyên tâm.</p>
      <h4>Phép Mầu Từ Phật Pháp</h4>
      <p>Sau chỉ 2 tháng, chồng tôi thay đổi completamente. Anh ấy tự bỏ rượu mà không ai ép. Anh ấy bắt đầu đi khám phá Phật pháp cùng với tôi.</p>
      <p>Gia đình hòa hợp trở lại. Con trẻ cười nhiều hơn. Chúng tôi lại thấy tình yêu giữa nhau. Đó là phép mầu thực sự!</p>
      <p>Cảm ơn vô hạn Sư Phụ, cảm ơn Phật Pháp, cảm ơn tất cả mọi người đã hỗ trợ tôi.</p>
    `,
    likeCount: 458,
    viewCount: 4200,
  },

  {
    id: 4,
    type: 'story',
    category: 'Gia Đình',
    title: 'MẸ BỆNH NẶNG Được CỨU SỐNG Kỳ Diệu',
    author: 'Anh Minh Tuấn',
    country: 'Việt Nam',
    date: '22/02/2026',
    excerpt: 'Mẹ bệnh nặng nằm viện, bác sĩ nói khó qua khỏi. Gia đình tuyệt vọng. Sau 6 tuần niệm 87 biến Ngôi Nhà Nhỏ, phóng sinh, mẹ xuất viện kỳ diệu!',
    coverImage: 'https://images.unsplash.com/photo-1632833716993-d1f1ebab9e5d?w=600&h=400&fit=crop',
    fullContent: `
      <h3>Câu Chuyện Tình Yêu Mẹ Của Anh Minh Tuấn</h3>
      <p>Ngày 15/01/2026 là ngày buồn nhất cuộc đời tôi. Mẹ tôi bị đau tim nặng, được đưa vào viện mổ cấp cứu. Các bác sĩ nói tỷ lệ sống sót rất thấp.</p>
      <p>Cả gia đình tôi như sập đổ. Tôi không biết làm gì, chỉ khóc lóc ở bệnh viện.</p>
      <h4>Gặp Pháp Môn Tâm Linh</h4>
      <p>Một người bạn giới thiệu tôi Pháp Môn Tâm Linh. Anh ấy hướng dẫn tôi cách niệm 87 biến Ngôi Nhà Nhỏ mỗi ngày cho mẹ, phóng sinh cá hàng tuần, phát nguyện ăn chay.</p>
      <p>Tôi làm hết lòng. Mỗi sáng thức dậy, ngôi nhà nhỏ là việc đầu tiên tôi làm.</p>
      <h4>Kỳ Tích Xảy Ra</h4>
      <p>Sau 3 tuần, các bác sĩ bất ngờ vì tình trạng mẹ hồi phục nhanh hơn dự kiến. Sau 6 tuần, mẹ xuất viện hoàn toàn khỏe mạnh!</p>
      <p>Các bác sĩ nói: "Đây là một phép mầu. Chúng tôi không thể giải thích bằng y khoa."</p>
      <p>Cảm ơn Phật Pháp đã cứu sống mẹ tôi. Từ sau đó, cả gia đình tôi đều tu học Pháp Môn Tâm Linh.</p>
    `,
    likeCount: 892,
    viewCount: 6500,
  },

  // ============= LOẠI C: FEEDBACK =============
  {
    id: 5,
    type: 'feedback',
    category: 'Sức Khỏe',
    author: 'Chị Jenny Hsu',
    country: 'Đài Loan',
    date: '21/02/2026',
    excerpt: 'Phản hồi ngắn',
    quote: 'Viêm khớp dạng thấp suốt 10 năm. Thuốc hết tác dụng. Sau 3 tháng niệm kinh, xét nghiệm bình thường. Bác sĩ ngạc nhiên!',
    tags: ['#SứcKhỏe', '#NiệmKinh', '#PhóngSinh'],
  },

  {
    id: 6,
    type: 'feedback',
    category: 'Thi Cử',
    author: 'Em Thiện Phúc',
    country: 'Việt Nam',
    date: '20/02/2026',
    excerpt: 'Phản hồi ngắn',
    quote: 'Học lực trung bình, lo lắng không đỗ đại học. Mẹ niệm kinh cho tôi 3 tháng. Tôi đỗ TOP với điểm cao bất ngờ!',
    tags: ['#ThiCử', '#CầuCon', '#NiệmKinh'],
  },

  {
    id: 7,
    type: 'feedback',
    category: 'Mất Ngủ',
    author: 'Anh David Chen',
    country: 'Singapore',
    date: '19/02/2026',
    excerpt: 'Phản hồi ngắn',
    quote: '5 năm mất ngủ kinh niên. Thuốc Tây không giúp. Niệm kinh 3 tuần, bắt đầu ngủ ngon. 2 tháng, mất ngủ biến mất hoàn toàn!',
    tags: ['#MấtNgủ', '#ChúĐạiBi', '#NgôiNhàNhỏ'],
  },

  // ============= THÊM CÁC CARD KHÁC PH PHỊ =============
  {
    id: 8,
    type: 'video',
    category: 'Tâm Linh',
    title: 'Cảm Ngộ Sâu Sắc Về Con Đường Tu Tập',
    author: 'Chị Phương Anh',
    country: 'Úc',
    date: '18/02/2026',
    excerpt: 'Trước khi tu học, tôi cảm thấy cuộc sống vô nghĩa, trống rỗng. Sau khi tiếp xúc Phật pháp, tôi tìm thấy mục đích sống của mình.',
    videoThumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '18:20',
    rating: 5,
    viewCount: 3200,
    commentCount: 156,
  },

  {
    id: 9,
    type: 'story',
    category: 'Kinh Doanh',
    title: 'KINH DOANH Từ BẤT OAI Sang THỊNH VỢT',
    author: 'Anh Trí Nhân',
    country: 'Việt Nam',
    date: '17/02/2026',
    excerpt: 'Doanh nghiệp sắp đóng cửa. Sau khi niệm Chuẩn Đề Thần Chú, cầu sự nghiệp, phóng sinh cá, business bắt ngoạn ngoạn nhất.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    fullContent: `
      <h3>Từ Phá Sản Đến Thịnh Vợt Nhờ Phật Pháp</h3>
      <p>Xin chào mọi người, tôi là Anh Trí Nhân từ Hà Nội. Tôi muốn chia sẻ câu chuyện thay đổi cuộc đời tôi.</p>
      <p>Hai năm trước, doanh nghiệp của tôi gặp khó khăn nặng nề. Hàng tồn kho tích tụ, khách hàng chuyển đi, công nhân phải giải ranh. Tôi sắp phải đóng khoá cửa.</p>
      <h4>Tìm Thấy Phật Pháp</h4>
      <p>Nhờ một ông bạn, tôi tìm hiểu về Pháp Môn Tâm Linh. Sư Phụ hướng dẫn tôi niệm Chuẩn Đề Thần Chú 108 biến/ngày, phóng sinh cá hàng tuần, sám hối nghiệp chướng tài chính.</p>
      <p>Tôi làm rất chuyên tâm. Tôi hiểu rằng nếu không thay đổi nội tâm, ngoại cảnh sẽ không thay đổi.</p>
      <h4>Business Bắt Ngoạn Ngoạn</h4>
      <p>Sau 3 tháng, những khách hàng cũ bắt đầu quay lại. Một dự án lớn được ký hợp đồng bất ngờ. Hàng tồn kho dần được tiêu thụ.</p>
      <p>Hiện tại, doanh nghiệp tôi không chỉ phục hồi mà còn phát triển vượt bậc. Doanh số tăng gấp đôi so với 2 năm trước.</p>
      <p>Tôi rất biết ơn Phật Pháp. Nó đã cứu sống doanh nghiệp của tôi.</p>
    `,
    likeCount: 567,
    viewCount: 3800,
  },

  {
    id: 10,
    type: 'feedback',
    category: 'Gia Đình',
    author: 'Chị Linh Mai',
    country: 'Mỹ',
    date: '16/02/2026',
    excerpt: 'Phản hồi ngắn',
    quote: 'Con tôi tự kỷ, khó giao tiếp. Sau 2 tháng phóng sinh và niệm kinh cho con, con thay đổi nhiều. Giờ con có bạn, vui vẻ hơn!',
    tags: ['#GiaDình', '#ConYêu', '#TuTập'],
  },

  {
    id: 11,
    type: 'video',
    category: 'Sức Khỏe',
    title: 'CẬU BÉ 7 TUỔI KHỎI BỆNH CUM DÀI NGÀY',
    author: 'Chị Thảo Linh',
    country: 'Việt Nam',
    date: '15/02/2026',
    excerpt: 'Con trai tôi bị cúm kéo dài 3 tuần, sốt cao, ho không ngưng. Sau 1 tuần niệm Chú Đại Bi và phóng sinh, con khỏe hoàn toàn.',
    videoThumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '10:15',
    rating: 5,
    viewCount: 1900,
    commentCount: 102,
  },

  {
    id: 12,
    type: 'story',
    category: 'Hôn Nhân',
    title: 'CUỘC HỚN THỨ HAI CHO TÔI TẠI TUỔI 50',
    author: 'Chị Bình Hằng',
    country: 'Đức',
    date: '14/02/2026',
    excerpt: 'Lần thứ nhất, tôi ly hôn sau 20 năm chung sống đầy đau khổ. Tôi từ bỏ hy vọng. Nhưng Phật pháp đã cho tôi một cơ hội thứ hai...',
    coverImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop',
    fullContent: `
      <h3>Tôi Được Một Cơ Hội Thứ Hai Để Yêu</h3>
      <p>Tôi là Chị Bình Hằng, 52 tuổi, hiện sống ở Munich, Đức. Tôi muốn chia sẻ câu chuyện thay đổi cuộc đời tôi từ sự절망 sang hy vọng.</p>
      <h4>Hôn Nhân Thứ Nhất Đầy Đau Khổ</h4>
      <p>Sau 20 năm chung sống với người chồng thứ nhất, chúng tôi quyết định chia tay. Đó là 20 năm của sự bất hòa, cửa nộc, và những lời nói cay độc.</p>
      <p>Tôi cảm thấy cuộc đời của tôi đã kết thúc. Ở tuổi 45, tôi cảm thấy như một người phụ nữ đã qua thời, không còn hy vọng về hạnh phúc.</p>
      <h4>Phật Pháp Mở Cửa Tim Tôi</h4>
      <p>Nhờ một người bạn, tôi biết về Pháp Môn Tâm Linh. Tôi bắt đầu niệm kinh, phóng sinh, sám hối những sai lầm trong hôn nhân đầu tiên.</p>
      <p>Tôi học cách yêu thương chính mình, học cách tha thứ cho quá khứ. Mỗi ngày, tôi cảm thấy tim tôi mở rộng hơn.</p>
      <h4>Hôn Nhân Thứ Hai - Tình Yêu Thật Sự</h4>
      <p>Sau 2 năm tu học, tôi gặp người chồng thứ hai - một người đàn ông tốt bụng, cũng tu học Pháp Môn. Chúng tôi kết hôn 1 năm trước.</p>
      <p>Cuộc sống hiện tại của tôi đầy yêu thương, sự tôn trọng lẫn nhau, và sự hỗ trợ tinh thần. Đó là những gì tôi luôn mong muốn.</p>
      <p>Tôi muốn nói với tất cả phụ nữ: đừng bỏ cuộc. Phật Pháp có thể mở ra những khả năng mới trong cuộc sống của bạn, dù ở bất kỳ tuổi nào.</p>
    `,
    likeCount: 723,
    viewCount: 5100,
  },

  {
    id: 13,
    type: 'feedback',
    category: 'Trong',
    author: 'Anh Khoa Nguyễn',
    country: 'Úc',
    date: '13/02/2026',
    excerpt: 'Phản hồi ngắn',
    quote: 'Tôi là một người trẻ tuổi, luôn bị căng thẳng, không tập trung được. Sau khi thiền định và niệm kinh, tâm tôi yên tĩnh hơn nhiều.',
    tags: ['#TâmLinh', '#Thiền', '#TuTập'],
  },

  {
    id: 14,
    type: 'video',
    category: 'Tâm Linh',
    title: 'TÔI HIỂU ĐƯỢC THẦN HIỆU CỦA NIỆM KINH',
    author: 'Anh Phạm Minh',
    country: 'Canada',
    date: '12/02/2026',
    excerpt: 'Trước đây, tôi là một người vô thần. Nhưng sau khi thấy kỳ tích trong cuộc sống, tôi hiểu được sức mạnh thực sự của Phật Pháp.',
    videoThumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '14:40',
    rating: 5,
    viewCount: 2100,
    commentCount: 95,
  },

  {
    id: 15,
    type: 'feedback',
    category: 'Sức Khỏe',
    author: 'Chị Huệ Vân',
    country: 'Thái Lan',
    date: '11/02/2026',
    excerpt: 'Phản hồi ngắn',
    quote: 'Tôi bị mất tóc nặng, tóc xoả đầy gối mỗi tối. Sau ăn chay + niệm kinh 2 tháng, tóc ngưng rụng, mọc lại toàn.',
    tags: ['#SứcKhỏe', '#LàmđẹpTuTập', '#ĂnChay'],
  },

  {
    id: 16,
    type: 'story',
    category: 'Sự Nghiệp',
    title: 'TỪ NHÂN VIÊN BÌNH THƯỜNG ĐẾN QUẢN LÝ',
    author: 'Anh Lâm Huy',
    country: 'Singapore',
    date: '10/02/2026',
    excerpt: 'Trong 5 năm, tôi là một nhân viên bình thường, không có cơ hội thăng tiến. Sau 6 tháng tu học, tôi được thăng chức quản lý.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    fullContent: `
      <h3>Sự Thăng Tiến Bất Ngờ Từ Phật Pháp</h3>
      <p>Xin chào, tôi là Anh Lâm Huy, làm việc cho một công ty ngân hàng ở Singapore.</p>
      <p>Suốt 5 năm, tôi là một nhân viên bình thường. Công việc của tôi tốt, nhưng tôi không bao giờ được notice hay thăng tiến. Tôi bắt đầu cảm thấy tuyệt vọng về sự nghiệp.</p>
      <h4>Gặp Phật Pháp</h4>
      <p>Một đồng nghiệp giới thiệu tôi Pháp Môn Tâm Linh. Tôi bắt đầu niệm Chuẩn Đề Thần Chú 108 biến/ngày cầu sự nghiệp cát tường.</p>
      <p>Không chỉ niệm kinh, tôi cũng thay đổi cách làm việc - tôi trở nên chủ động hơn, hỗ trợ người khác tốt hơn, tinh thần tích cực hơn.</p>
      <h4>Sự Thay Đổi Bất Ngờ</h4>
      <p>Sau 6 tháng tu học, một vị trí quản lý bất ngờ mở ra. Tôi được promoted. Hiện tại, tôi đang quản lý một team 8 người.</p>
      <p>Tôi không chỉ nhận được thăng tiến mà còn nhận được tình yêu thương từ team và lãnh đạo. Tôi cảm thấy cuộc sống của tôi có ý nghĩa hơn.</p>
      <p>Cảm ơn Phật Pháp đã thay đổi cuộc sống của tôi. Và cảm ơn bạn đã đọc câu chuyện của tôi.</p>
    `,
    likeCount: 385,
    viewCount: 2900,
  },

  {
    id: 17,
    type: 'story',
    category: 'Sự Nghiệp',
    title: 'TÌM VIỆC LÀM Kỳ Diệu Tại Úc',
    author: 'Chị Thị',
    country: 'Úc',
    date: '10/02/2026',
    excerpt: 'Tìm việc từ đầu năm nhưng không có kết quả. Sau khi phóng sinh và niệm Chuẩn Đề Thần Chú, nhận được offer từ công ty lớn đúng thời điểm Sư Phụ dự báo.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    fullContent: `
      <h3>Bồ Tát Ứng Nguyện Việc Làm</h3>
      <p>Tôi là Chị Thị, đang sinh sống tại Úc. Tôi muốn chia sẻ về sự linh ứng khi cầu xin việc làm.</p>
      <p>Suốt từ đầu năm 2024, tôi nộp đơn khắp nơi nhưng chỉ nhận được những lời từ chối. Tôi bắt đầu lo lắng và áp lực tài chính.</p>
      <h4>Hành Trì Theo Pháp Môn</h4>
      <p>Tôi được hướng dẫn phóng sinh 600 con cá và niệm Chuẩn Đề Thần Chú 108 biến mỗi ngày. Sư Phụ còn nói rằng muộn nhất tháng 4 tôi sẽ có việc.</p>
      <p>Tôi thực hành rất thành tâm, gạt bỏ lo âu sang một bên.</p>
      <h4>Kết Quả Bất Ngờ</h4>
      <p>Đúng như lời Sư Phụ, giữa tháng 3 tôi nhận được cuộc gọi phỏng vấn từ một tập đoàn lớn. Chỉ sau 2 vòng, tôi nhận được offer với mức lương tốt hơn mong đợi.</p>
      <p>Phật Pháp thật sự không bỏ rơi ai nếu chúng ta có lòng tin.</p>
    `,
    likeCount: 245,
    viewCount: 1500,
  },
  {
    id: 18,
    type: 'feedback',
    category: 'Tâm Linh',
    author: 'Chị Lan Anh',
    country: 'Úc',
    date: '08/02/2026',
    excerpt: 'Vượt qua ác mộng nhờ niệm kinh chuyên cần.',
    quote: 'Thường xuyên gặp ác mộng, cảm giác nặng nề. Sau 1 tháng niệm Ngôi Nhà Nhỏ và Chú Đại Bi, ác mộng biến mất, cảm giác như nhấc được cả tấn nặng ra khỏi người.',
    tags: ['#TâmLinh', '#NgôiNhàNhỏ', '#BìnhAn'],
  },
  {
    id: 19,
    type: 'video',
    category: 'Sự Nghiệp',
    title: 'HỒI SINH Từ Vực Thẳm Phá Sản',
    author: 'Anh Văn Hùng',
    country: 'Việt Nam',
    date: '05/02/2026',
    excerpt: 'Công ty phá sản, nợ nần chồng chất, gia đình tan vỡ. Sau 6 tháng tu học chuyên cần, trả hết nợ và gia đình đoàn tụ.',
    videoThumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    videoDuration: '22:15',
    rating: 5,
    viewCount: 4500,
    commentCount: 220,
    fullStory: {
      problem: 'Công ty phá sản, nợ nần, vợ đòi ly hôn do áp lực tài chính quá lớn.',
      solution: 'Phát nguyện ăn chay trường, niệm 108 Ngôi Nhà Nhỏ, phóng sinh 1000 con cá.',
      result: 'Chỉ sau 6 tháng, các khoản nợ được giải quyết ổn thỏa, vợ quay về và cùng tu tập.',
      timeframe: '6 tháng',
    },
  },
];

// Categories list
export const categories = [
  'Tất cả',
  'Sức Khỏe',
  'Gia Đình',
  'Sự Nghiệp',
  'Hôn Nhân',
  'Tâm Linh',
  'Thi Cử',
  'Kinh Doanh',
  'Mất Ngủ',
  'Mối Quan Hệ',
];

// Sorting options
export enum SortOption {
  NEWEST = 'newest',
  POPULAR = 'popular', // by viewCount
  HIGHEST_RATED = 'highest_rated', // by rating
}
