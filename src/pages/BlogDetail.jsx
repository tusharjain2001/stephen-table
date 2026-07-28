import CtaBanner from '../components/CtaBanner.jsx';

import heroBlog from '../assets/images/hero-blog.png';
import ctaBannerImg from '../assets/images/cta-banner.png';
import blogImg1 from '../assets/images/blog-img-1.png';
import blogImg2 from '../assets/images/blog-img-2.png';
import blogImg3 from '../assets/images/blog-img-3.png';
import blogImg4 from '../assets/images/blog-img-4.png';

const PARAGRAPHS = [
  "As we age, home becomes more than just a place to live, it becomes a place filled with memories, comfort, and familiarity. For many older adults, remaining in their own homes represents independence, dignity, and a continued connection to the communities they know and love. However, everyday tasks that once felt effortless can gradually become more challenging, making it important to create an environment that supports both safety and well-being.",
  "A safe home doesn't always require major renovations. Small, thoughtful improvements can significantly reduce the risk of accidents while making daily routines easier to manage. Simple changes such as improving lighting in hallways and staircases, securing loose rugs, organizing frequently used items within easy reach, and installing grab bars in bathrooms can create a safer and more accessible living space. Routine maintenance, including repairing uneven flooring, checking smoke detectors, and ensuring walkways remain clutter-free, also contributes to a more secure home environment.",
  'Practical support extends beyond the home itself. Everyday tasks like grocery shopping, attending medical appointments, seasonal yard work, or organizing household spaces can become difficult without assistance. Having reliable support for these activities not only helps seniors maintain their independence but also provides reassurance to family members and caregivers who may not always be able to help.',
  'Equally important is emotional well-being. Many older adults experience loneliness or social isolation, especially after retirement, the loss of a spouse, or when family members live far away. Staying socially connected through conversations, community events, hobby groups, or simply spending time with others can improve emotional health, increase confidence, and foster a greater sense of belonging. Meaningful relationships often have just as much impact on overall wellness as physical care.',
  "Families and caregivers also play a vital role in supporting seniors. Open communication, regular check-ins, and understanding changing needs can help identify challenges before they become larger concerns. Whether it's arranging transportation to appointments, encouraging participation in community activities, or helping coordinate access to local resources, every small action contributes to improving a loved one's quality of life.",
  "Community organizations play an essential role in bridging the gap between seniors and the support they need. By connecting older adults with practical assistance, trusted volunteers, and valuable local resources, communities can ensure that aging doesn't mean facing life's challenges alone. Collaboration between families, volunteers, healthcare providers, and nonprofit organizations creates a stronger network of care that benefits everyone involved.",
  "At Stephen's Table Colorado, our mission is to help seniors age safely, live with dignity, and remain connected to the communities they call home. Through practical home support, meaningful fellowship, and connections to trusted community resources, we strive to empower older adults to continue living independently while receiving the care and companionship they deserve.",
  "Every act of kindness whether it's helping with household tasks, sharing a conversation, volunteering a few hours, or making a donation creates a lasting impact. Together, we can build a community where every senior feels safe, valued, supported, and never alone.",
  "Need support or want to get involved? Contact us today to learn how Stephen's Table Colorado can help.",
];

function BlogDetail() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[470px] w-full overflow-hidden">
        <img src={heroBlog} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(56,41,31,0.9) 0%, rgba(56,41,31,0.2) 100%)',
          }}
        />
        <div
          className="absolute bottom-0 flex flex-col gap-[16px] pb-[42px]"
          style={{ left: 82, width: 738 }}
        >
          <h1 className="capitalize font-display text-[40px] tracking-[2px] text-white">
            Helping seniors age safely at home
          </h1>
          <p className="font-sans text-[28px] text-wb-400">
            Published on: July 2026 &bull; Category: Senior Care
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="w-full py-[72px]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-[20px] px-[72px] text-justify font-sans text-[20px] text-gray-59">
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Image gallery */}
      <section className="w-full pb-[72px]">
        <div className="mx-auto max-w-[1440px] px-[72px]">
          <div className="relative mx-auto h-[822px] w-[1296px]">
            <img
              src={blogImg1}
              alt=""
              className="absolute left-0 top-0 h-[380px] w-[419px] rounded-card object-cover"
            />
            <img
              src={blogImg2}
              alt=""
              className="absolute left-[438px] top-0 h-[380px] w-[419px] rounded-card object-cover"
            />
            <img
              src={blogImg3}
              alt=""
              className="absolute left-[877px] top-0 h-[822px] w-[419px] rounded-card object-cover"
            />
            <img
              src={blogImg4}
              alt=""
              className="absolute left-0 top-[402px] h-[420px] w-[857px] rounded-card object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBanner
        image={ctaBannerImg}
        pillTheme="white"
        title="Here When You Need Us..."
        subtitle="Whether you need assistance or want to support our community, we'd love to hear from you."
      />
    </div>
  );
}

export default BlogDetail;
