import React from "react";
import LazySection from "../common/LazySection";
import Campers from "../../components/campersMainPage/Campers";
import MisBeneficios from "../../components/sponsorBeneficios/MisBeneficios";

const DashboardView = () => {
  return (
    <div className="flex flex-col">
      <LazySection>
        <div id="campers-section">
          <Campers title="Auspiciados!" subtitle="Gracias a ti ellos terminaron su formación" />
        </div>
      </LazySection>

      <LazySection>
        <div id="beneficios">
          <MisBeneficios />
        </div>
      </LazySection>
    </div>
  );
};

export default DashboardView;
