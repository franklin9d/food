import { features } from '@/lib/data';

export function FeatureSection() {
  return (
    <section className="sectionSpacing">
      <div className="container">
        <div className="sectionHeading">
          <span>المميزات</span>
          <h2>منصة مصممة لتكون جميلة، عملية، وقابلة للتوسع</h2>
        </div>
        <div className="cardGrid fourCols">
          {features.map((feature) => (
            <article className="infoCard" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
