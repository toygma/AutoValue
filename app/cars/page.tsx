import { Suspense } from "react";
import CarsPage from "./_components/CarsPage";

const Cars = () => {
  return (
    <Suspense fallback={<span>Yükleniyor...</span>}>
      <CarsPage />
    </Suspense>
  );
};

export default Cars;
