import Image from 'next/image';
import { impactStories } from '@/lib/data';

export function ImpactSection() {
  return (
    <section className="sectionSpacing">
      <div className="container splitSection">
        <div>
          <div className="sectionHeading leftAligned">
            <span>أثر مجتمعي</span>
            <h2>الفكرة تخاطب التحكيم بلغة الأثر والاستدامة</h2>
          </div>
          <div className="stackList">
            {impactStories.map((item) => (
              <article className="stackCard" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="imageFrame">
          <Image src="/images/community-impact.svg" alt="Community impact" width={640} height={500} />
        </div>
      </div>
    </section>
  );
}
