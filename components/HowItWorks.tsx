import { howItWorks } from '@/lib/data';

export function HowItWorks() {
  return (
    <section className="sectionSpacing altSection">
      <div className="container">
        <div className="sectionHeading">
          <span>آلية العمل</span>
          <h2>رحلة متكاملة من لحظة التبرع حتى التسليم</h2>
        </div>
        <div className="timelineGrid">
          {howItWorks.map((item) => (
            <article className="timelineCard" key={item.step}>
              <div className="stepBadge">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
